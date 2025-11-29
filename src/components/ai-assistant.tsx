'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getRecommendationsAction } from '@/lib/actions';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Sparkles, Loader2, List, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const initialState = {
  recommendations: [],
  error: null,
};

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      {children}
    </Button>
  );
}

export default function AiAssistant() {
  const [state, formAction] = useFormState(getRecommendationsAction, initialState);
  const [key, setKey] = useState(0);

  const handleTrendingClick = () => {
    const formData = new FormData();
    formData.append('trending', 'true');
    formAction(formData);
  };

  const resetForm = () => {
    setKey(prevKey => prevKey + 1);
  };

  return (
    <div key={key} className="w-full max-w-2xl mx-auto text-center">
      <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
        What to Watch Next?
      </h2>
      <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4 mb-8">
        Let our AI assistant help you find the perfect game. Tell us your favorite sport or get recommendations based on what's currently trending.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <form action={formAction} className="flex gap-2 w-full sm:w-auto">
          <Input name="preference" type="text" placeholder="e.g., Premier League, NBA" className="min-w-[200px] sm:min-w-[300px]" required />
          <SubmitButton>Get Recs</SubmitButton>
        </form>
        <span className="text-muted-foreground">or</span>
        <Button onClick={handleTrendingClick} variant="outline">
          <Zap className="mr-2 h-4 w-4" />
          Trending Now
        </Button>
      </div>

      {state?.error && (
        <Alert variant="destructive" className="mt-4 text-left">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state?.recommendations && state.recommendations.length > 0 && (
        <Card className="mt-8 text-left animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="h-6 w-6 text-primary" />
              Your Personalized Recommendations
            </CardTitle>
            <CardDescription>
              Based on your request, here are some events you won't want to miss.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {state.recommendations.map((rec, index) => (
                <li key={index} className="flex items-center p-3 rounded-md bg-secondary/50">
                  <Sparkles className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
            <Button variant="link" onClick={resetForm} className="mt-4">
              Get new recommendations
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
