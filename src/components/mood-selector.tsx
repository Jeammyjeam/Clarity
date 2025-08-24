'use client';

import { Button } from '@/components/ui/button';
import { moods, type MoodDefinition } from '@/lib/moods';

interface MoodSelectorProps {
  onMoodSelect: (mood: MoodDefinition) => void;
  disabled?: boolean;
}

export function MoodSelector({ onMoodSelect, disabled }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {moods.map((mood) => (
        <Button
          key={mood.name}
          variant="outline"
          className="h-24 flex-col gap-2 text-base"
          onClick={() => onMoodSelect(mood)}
          disabled={disabled}
        >
          <mood.icon className={`w-8 h-8 ${mood.color}`} />
          <span>{mood.name}</span>
        </Button>
      ))}
    </div>
  );
}
