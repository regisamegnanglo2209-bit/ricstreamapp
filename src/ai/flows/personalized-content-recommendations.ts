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
    .describe('Les sports ou genres de contenu préférés de l\'utilisateur.'),
  trendingEvents: z
    .string()
    .optional()
    .describe('Événements sportifs ou contenus tendances.'),
});

export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('Une liste de recommandations de contenu personnalisées.'),
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
  prompt: `Vous êtes un assistant IA qui fournit des recommandations de contenu personnalisées en fonction des préférences de l'utilisateur et des événements tendances.
La réponse doit être en français.

  Préférences de l'utilisateur : {{userPreferences}}
  Événements tendances : {{trendingEvents}}

  Fournissez une liste de 3 à 5 recommandations de contenu adaptées à l'utilisateur.
  Formatez les recommandations comme une liste de chaînes de caractères.
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
