import { Sparkles } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 p-2">
      <Sparkles className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold font-headline text-foreground group-data-[collapsible=icon]:hidden">
        Clarity AI
      </span>
    </div>
  );
}
