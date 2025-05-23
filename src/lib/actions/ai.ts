"use server";

import { suggestFreelancers, type SuggestFreelancersInput, type SuggestFreelancersOutput } from "@/ai/flows/suggest-freelancers";

export async function getFreelancerSuggestionsAction(
  input: SuggestFreelancersInput
): Promise<SuggestFreelancersOutput | { error: string }> {
  try {
    const result = await suggestFreelancers(input);
    return result;
  } catch (error) {
    console.error("Error getting freelancer suggestions:", error);
    return { error: "Failed to get suggestions. Please try again." };
  }
}
