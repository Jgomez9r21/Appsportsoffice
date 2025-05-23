"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getFreelancerSuggestionsAction } from "@/lib/actions/ai";
import { Loader2, Sparkles, UserCheck } from "lucide-react";

const formSchema = z.object({
  projectDescription: z.string().min(50, "Please provide a detailed description (at least 50 characters).").max(2000),
});

type SuggestFreelancersFormValues = z.infer<typeof formSchema>;

export default function SuggestFreelancersClient() {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SuggestFreelancersFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectDescription: "",
    },
  });

  async function onSubmit(values: SuggestFreelancersFormValues) {
    setIsLoading(true);
    setSuggestions([]);
    try {
      const result = await getFreelancerSuggestionsAction({
        projectDescription: values.projectDescription,
      });

      if ("error" in result) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        setSuggestions(result.freelancerSuggestions);
        if (result.freelancerSuggestions.length === 0) {
          toast({
            title: "No specific suggestions found",
            description: "Try refining your project description for better results.",
          });
        } else {
           toast({
            title: "Suggestions Ready!",
            description: "Here are some freelancers that might be a good fit.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "An Unexpected Error Occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-primary flex items-center">
            <Sparkles className="mr-2 h-6 w-6" /> AI Freelancer Suggestions
          </CardTitle>
          <CardDescription>
            Describe your project, and our AI will suggest relevant freelancers for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I need a Python developer experienced with Django and REST APIs to build a backend for a social media analytics platform. Key features include user authentication, data ingestion from multiple sources, and a dashboard API..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Suggestions...
                  </>
                ) : (
                  "Suggest Freelancers"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(!isLoading && suggestions.length > 0) && (
        <Card className="w-full max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Suggested Freelancers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {suggestions.map((freelancer, index) => (
                <li key={index} className="flex items-center p-3 bg-secondary/50 rounded-md border">
                  <UserCheck className="mr-3 h-5 w-5 text-green-500" />
                  <span className="text-md">{freelancer}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
       {(!isLoading && suggestions.length === 0 && form.formState.isSubmitted) && (
        <Card className="w-full max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-primary">No Suggestions Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We couldn't find specific freelancer suggestions based on your current description.
              Please try to be more detailed or broaden your project scope.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
