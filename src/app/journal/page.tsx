'use client';

import { useMoodJournal } from '@/hooks/use-mood-journal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getMoodByName } from '@/lib/moods';
import { BookHeart, Loader, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function JournalPage() {
  const { entries, clearJournal, isLoaded } = useMoodJournal();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
            <BookHeart className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground font-headline">My Mood Journal</h1>
        </div>
        {entries.length > 0 && (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear Journal
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all
                        your mood journal entries.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={clearJournal}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )}
      </div>

      {!isLoaded && (
        <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
          <Loader className="animate-spin" />
          <span>Loading your journal...</span>
        </div>
      )}

      {isLoaded && entries.length === 0 && (
        <Card className="text-center py-16">
          <CardContent>
            <p className="text-muted-foreground">Your journal is empty.</p>
            <p>Go to the Home page to log your first mood.</p>
          </CardContent>
        </Card>
      )}

      {isLoaded && entries.length > 0 && (
        <div className="grid gap-4">
          {entries.map((entry) => {
            const moodInfo = getMoodByName(entry.mood as any);
            return (
              <Card key={entry.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    {moodInfo?.icon && (
                      <moodInfo.icon className={`w-8 h-8 ${moodInfo.color}`} />
                    )}
                    <div>
                      <CardTitle>{entry.mood}</CardTitle>
                      <CardDescription>
                        {format(new Date(entry.date), 'MMMM d, yyyy - h:mm a')}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
                    {entry.affirmation}
                  </blockquote>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
