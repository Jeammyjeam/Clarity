import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { articles, quotes } from '@/lib/content';
import { BookOpen, Quote } from 'lucide-react';

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-3 text-2xl font-bold text-foreground font-headline">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1>Insights Library</h1>
        </div>
        <p className="max-w-prose text-muted-foreground">
          Explore a collection of articles and quotes to help you understand and navigate your emotional world.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4 font-headline">Articles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{article.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 font-headline">Wisdom Quotes</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {quotes.map((quote, index) => (
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
      </section>
    </div>
  );
}
