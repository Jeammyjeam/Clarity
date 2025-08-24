'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Mood {
  id: string;
  mood: string;
  date: string;
  affirmation: string;
}

const JOURNAL_KEY = 'clarity-ai-mood-journal';

export const useMoodJournal = () => {
  const [entries, setEntries] = useState<Mood[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(JOURNAL_KEY);
      if (item) {
        setEntries(JSON.parse(item));
      }
    } catch (error) {
      console.error('Failed to load mood journal from localStorage', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const addEntry = useCallback((newEntry: Mood) => {
    setEntries((prevEntries) => {
      const updatedEntries = [newEntry, ...prevEntries];
      try {
        window.localStorage.setItem(JOURNAL_KEY, JSON.stringify(updatedEntries));
      } catch (error) {
        console.error('Failed to save mood journal to localStorage', error);
      }
      return updatedEntries;
    });
  }, []);
  
  const clearJournal = useCallback(() => {
    setEntries([]);
    try {
        window.localStorage.removeItem(JOURNAL_KEY);
    } catch (error) {
        console.error('Failed to clear mood journal from localStorage', error);
    }
  }, []);

  return { entries, addEntry, clearJournal, isLoaded };
};
