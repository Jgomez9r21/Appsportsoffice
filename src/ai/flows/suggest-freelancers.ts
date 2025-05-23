'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest relevant freelancers
 * based on a project description.
 *
 * - suggestFreelancers - A function that suggests freelancers based on project description.
 * - SuggestFreelancersInput - The input type for the suggestFreelancers function.
 * - SuggestFreelancersOutput - The return type for the suggestFreelancers function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFreelancersInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A detailed description of the project for which freelancers are needed.'),
});
export type SuggestFreelancersInput = z.infer<typeof SuggestFreelancersInputSchema>;

const SuggestFreelancersOutputSchema = z.object({
  freelancerSuggestions: z
    .array(z.string())
    .describe('A list of freelancer names or IDs that are suitable for the project.'),
});
export type SuggestFreelancersOutput = z.infer<typeof SuggestFreelancersOutputSchema>;

export async function suggestFreelancers(input: SuggestFreelancersInput): Promise<SuggestFreelancersOutput> {
  return suggestFreelancersFlow(input);
}

const suggestFreelancersPrompt = ai.definePrompt({
  name: 'suggestFreelancersPrompt',
  input: {schema: SuggestFreelancersInputSchema},
  output: {schema: SuggestFreelancersOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant freelancers for a given project description.

  Given the following project description:
  {{projectDescription}}

  Suggest a list of freelancers who would be suitable for this project. Return a list of freelancer names or IDs.
  Ensure the output is a JSON array of strings.`,
});

const suggestFreelancersFlow = ai.defineFlow(
  {
    name: 'suggestFreelancersFlow',
    inputSchema: SuggestFreelancersInputSchema,
    outputSchema: SuggestFreelancersOutputSchema,
  },
  async input => {
    const {output} = await suggestFreelancersPrompt(input);
    return output!;
  }
);
