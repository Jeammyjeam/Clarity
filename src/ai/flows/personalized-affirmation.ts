// 'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating personalized affirmations based on detected mood.
 *
 * - generatePersonalizedAffirmation - A function that takes a mood description as input and returns a personalized affirmation.
 * - PersonalizedAffirmationInput - The input type for the generatePersonalizedAffirmation function.
 * - PersonalizedAffirmationOutput - The return type for the generatePersonalizedAffirmation function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedAffirmationInputSchema = z.object({
  mood: z
    .string()
    .describe("A description of the user's current mood, detected from their facial expression."),
  history: z.array(z.string()).optional().describe('The recent affirmations that have been generated for the user, to avoid repetition.'),
});
export type PersonalizedAffirmationInput = z.infer<typeof PersonalizedAffirmationInputSchema>;

const PersonalizedAffirmationOutputSchema = z.object({
  affirmation: z.string().describe('A personalized affirmation to uplift the user.'),
});
export type PersonalizedAffirmationOutput = z.infer<typeof PersonalizedAffirmationOutputSchema>;

export async function generatePersonalizedAffirmation(
  input: PersonalizedAffirmationInput
): Promise<PersonalizedAffirmationOutput> {
  return personalizedAffirmationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedAffirmationPrompt',
  input: {schema: PersonalizedAffirmationInputSchema},
  output: {schema: PersonalizedAffirmationOutputSchema},
  prompt: `You are a helpful and empathetic AI assistant designed to provide personalized affirmations to users based on their current mood.

  The user is feeling: {{{mood}}}

  {% if history %}
  To avoid repetition, here are some affirmations you've already provided:
  {{#each history}}
  - {{{this}}}
  {{/each}}
  {% endif %}

  Generate a single, unique affirmation that is tailored to their mood and encourages positive thinking.  Avoid generic or repetitive phrases.
  `,
});

const personalizedAffirmationFlow = ai.defineFlow(
  {
    name: 'personalizedAffirmationFlow',
    inputSchema: PersonalizedAffirmationInputSchema,
    outputSchema: PersonalizedAffirmationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

