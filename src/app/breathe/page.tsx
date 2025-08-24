import { BreathingExercise } from '@/components/breathing-exercise';
import { Wind } from 'lucide-react';

export default function BreathePage() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex items-center gap-3 text-2xl font-bold text-foreground font-headline">
        <Wind className="w-8 h-8 text-primary" />
        <h1>Breathing Exercise</h1>
      </div>
      <p className="max-w-prose text-muted-foreground">
        Center yourself with a simple, guided breathing exercise. Follow the on-screen prompts to regulate your breath, calm your mind, and find a moment of peace.
      </p>
      <div className="w-full mt-4">
        <BreathingExercise />
      </div>
    </div>
  );
}
