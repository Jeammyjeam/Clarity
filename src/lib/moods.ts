import { Smile, Frown, Meh, Angry, Annoyed, LucideIcon } from 'lucide-react';

export type MoodDefinition = {
  name: 'Joyful' | 'Sad' | 'Calm' | 'Anxious' | 'Angry';
  icon: LucideIcon;
  color: string;
  gradient: string;
};

export const moods: MoodDefinition[] = [
  {
    name: 'Joyful',
    icon: Smile,
    color: 'text-yellow-400',
    gradient: 'from-yellow-400/20 to-yellow-500/5',
  },
  {
    name: 'Sad',
    icon: Frown,
    color: 'text-blue-400',
    gradient: 'from-blue-400/20 to-blue-500/5',
  },
  {
    name: 'Calm',
    icon: Meh,
    color: 'text-green-400',
    gradient: 'from-green-400/20 to-green-500/5',
  },
  {
    name: 'Anxious',
    icon: Annoyed,
    color: 'text-purple-400',
    gradient: 'from-purple-400/20 to-purple-500/5',
  },
  {
    name: 'Angry',
    icon: Angry,
    color: 'text-red-400',
    gradient: 'from-red-400/20 to-red-500/5',
  },
];

export const getMoodByName = (name: string): MoodDefinition | undefined => {
  return moods.find(m => m.name === name);
};
