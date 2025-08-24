'use client';

import { useState, useMemo } from 'react';
import { generatePersonalizedAffirmation } from '@/ai/flows/personalized-affirmation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MoodSelector } from '@/components/mood-selector';
import { Mood, useMoodJournal } from '@/hooks/use-mood-journal';
import { BrainCircuit, Loader, Quote } from 'lucide-react';
import { articles, quotes } from '@/lib/content';
import { cn } from '@/lib/utils';
import type { MoodDefinition } from '@/lib/moods';

export default function Home() {
  const [currentMood, setCurrentMood] = useState<MoodDefinition | null>(null);
  const [affirmation, setAffirmation] = useState('');
  const [affirmationHistory, setAffirmationHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addEntry } = useMoodJournal();
  const { toast } = useToast();

  const handleMoodSelect = async (mood: MoodDefinition) => {
    setCurrentMood(mood);
    setIsLoading(true);
    setAffirmation('');

    try {
      const result = await generatePersonalizedAffirmation({
        mood: mood.name,
        history: affirmationHistory,
      });

      if (result.affirmation) {
        setAffirmation(result.affirmation);
        setAffirmationHistory(prev => [...prev, result.affirmation]);
        
        const newEntry: Mood = {
          id: Date.now().toString(),
          mood: mood.name,
          date: new Date().toISOString(),
          affirmation: result.affirmation,
        };
        addEntry(newEntry);
        toast({
          title: "Mood logged!",
          description: "Your mood has been saved to your journal.",
        });
      }
    } catch (error) {
      console.error('Error generating affirmation:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate an affirmation. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const curatedContent = useMemo(() => {
    if (!currentMood) return { articles: [], quotes: [] };
    const moodName = currentMood.name;
    return {
      articles: articles.filter(a => a.moods.includes(moodName)).slice(0, 2),
      quotes: quotes.filter(q => q.moods.includes(moodName)).slice(0, 2),
    };
  }, [currentMood]);
  
  const gradientClass = currentMood?.gradient || 'from-background to-background';

  return (
    <div className="flex flex-col gap-8">
      <div className={cn("rounded-xl p-6 md:p-10 transition-all duration-500", `bg-gradient-to-br ${gradientClass}`)}>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground font-headline">
          Welcome to Clarity AI
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your personal space for emotional understanding and growth.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="text-primary"/>
            <span>How are you feeling?</span>
          </CardTitle>
          <CardDescription>
            Scan your mood to receive a personalized affirmation and insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MoodSelector onMoodSelect={handleMoodSelect} disabled={isLoading} />
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center gap-3 text-muted-foreground p-8">
          <Loader className="animate-spin" />
          <p>Generating your personal affirmation...</p>
        </div>
      )}

      {affirmation && (
        <Card>
          <CardHeader>
            <CardTitle>Your Affirmation</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="text-xl italic border-l-4 pl-4">
              {affirmation}
            </blockquote>
          </CardContent>
        </Card>
      )}

      {currentMood && (curatedContent.articles.length > 0 || curatedContent.quotes.length > 0) && (
        <div className="grid gap-6 md:grid-cols-2">
           {curatedContent.articles.map((article, index) => (
              <Card key={index}>
                  <CardHeader>
                      <CardTitle>{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground">{article.summary}</p>
                  </CardContent>
              </Card>
           ))}
           {curatedContent.quotes.map((quote, index) => (
              <Card key={index} className="flex flex-col justify-center">
                  <CardContent className="pt-6">
                      <blockquote className="flex items-start gap-4">
                        <Quote className="w-8 h-8 text-muted-foreground/50 shrink-0 mt-1" />
                        <div>
                          <p className="text-lg italic">{quote.text}</p>
                          <footer className="mt-2 text-sm text-muted-foreground">- {quote.author}</footer>
                        </div>
                      </blockquote>
                  </CardContent>
              </Card>
           ))}
        </div>
      )}
    </div>
  );
}
