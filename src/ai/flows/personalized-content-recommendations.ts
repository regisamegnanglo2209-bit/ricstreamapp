'use server';

/**
 * @fileOverview Provides personalized content recommendations based on user preferences or trending events.
 *
 * - `getPersonalizedRecommendations` - A function that generates personalized content recommendations.
 * - `PersonalizedRecommendationsInput` - The input type for the `getPersonalizedRecommendations` function.
 * - `PersonalizedRecommendationsOutput` - The return type for the `getPersonalizedRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .optional()
    .describe('The user\u0027s preferred sports or content genres.'),
  trendingEvents: z
    .string()
    .optional()
    .describe('Trending sports events or content.'),
});

export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of personalized content recommendations.'),
});

export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedContentRecommendationsFlow(input);
}

const personalizedContentRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedContentRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI assistant that provides personalized content recommendations based on user preferences and trending events.

  User Preferences: {{userPreferences}}
  Trending Events: {{trendingEvents}}

  Provide a list of 3-5 content recommendations tailored to the user.
  Format the recommendations as a list of strings.
  `,
});

const personalizedContentRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedContentRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedContentRecommendationsPrompt(input);
    return output!;
  }
);
