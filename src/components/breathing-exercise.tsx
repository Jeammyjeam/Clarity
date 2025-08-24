'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from './ui/button';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const stages = [
  { name: 'Breathe In', duration: 4000 },
  { name: 'Hold', duration: 4000 },
  { name: 'Breathe Out', duration: 6000 },
  { name: 'Hold', duration: 2000 },
];

export function BreathingExercise() {
  const [isClient, setIsClient] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const currentStage = stages[stageIndex];

    const timer = setTimeout(() => {
      setStageIndex((prevIndex) => (prevIndex + 1) % stages.length);
    }, currentStage.duration);

    return () => clearTimeout(timer);
  }, [isRunning, stageIndex]);
  
  const toggleRunning = () => {
    setIsRunning(!isRunning);
    if (isRunning) {
        // If we are pausing, we want to stay on the current index
    } else {
        // If we are starting, ensure we are at the beginning of a cycle
        if(stageIndex !== 0) {
            setStageIndex(0);
        }
    }
  };

  const reset = () => {
    setIsRunning(false);
    setStageIndex(0);
  };

  const currentStage = stages[stageIndex];
  const isBreathingIn = currentStage.name === 'Breathe In';
  const isBreathingOut = currentStage.name === 'Breathe Out';

  if (!isClient) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Mindful Breathing</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div
            className={cn(
              'absolute bg-primary/20 rounded-full transition-all duration-[3000ms] ease-in-out',
              { 'w-64 h-64': isRunning && isBreathingIn },
              { 'w-24 h-24': isRunning && isBreathingOut },
              { 'w-24 h-24': !isRunning },
            )}
            style={{ transitionDuration: isBreathingIn ? '4000ms' : '6000ms' }}
          />
          <div
            className={cn(
              'absolute bg-primary/50 rounded-full transition-all duration-[3000ms] ease-in-out',
              { 'w-48 h-48': isRunning && isBreathingIn },
              { 'w-16 h-16': isRunning && isBreathingOut },
              { 'w-16 h-16': !isRunning },
            )}
            style={{ transitionDuration: isBreathingIn ? '4000ms' : '6000ms' }}
          />
          <div className="relative z-10 text-2xl font-bold text-primary-foreground bg-primary rounded-full w-32 h-32 flex items-center justify-center text-center p-2">
            {isRunning ? currentStage.name : 'Ready?'}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={toggleRunning} size="lg" className="w-24">
            {isRunning ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={reset} variant="outline" size="lg">
            <RefreshCw className="mr-2" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
