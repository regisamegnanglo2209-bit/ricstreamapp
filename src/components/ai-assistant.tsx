'use client';

import { useState, React, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
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
  const [state, formAction] = useActionState(getRecommendationsAction, initialState);
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
      <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
        Quoi regarder ensuite ?
      </h2>
      <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4 mb-8">
        Laissez notre assistant IA vous aider à trouver le match parfait. Dites-nous votre sport préféré ou obtenez des recommandations basées sur les tendances actuelles.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <form action={formAction} className="flex gap-2 w-full sm:w-auto">
          <Input name="preference" type="text" placeholder="ex: Ligue 1, NBA" className="min-w-[200px] sm:min-w-[300px]" required />
          <SubmitButton>Obtenir Recos</SubmitButton>
        </form>
        <span className="text-muted-foreground">ou</span>
        <Button onClick={handleTrendingClick} variant="outline">
          <Zap className="mr-2 h-4 w-4" />
          Tendances
        </Button>
      </div>

      {state?.error && (
        <Alert variant="destructive" className="mt-4 text-left">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state?.recommendations && state.recommendations.length > 0 && (
        <Card className="mt-8 text-left animate-fade-in-up bg-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="h-6 w-6 text-accent" />
              Vos recommandations personnalisées
            </CardTitle>
            <CardDescription>
              En fonction de votre demande, voici quelques événements que vous ne voudrez pas manquer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {state.recommendations.map((rec, index) => (
                <li key={index} className="flex items-center p-3 rounded-md bg-card">
                  <Sparkles className="h-5 w-5 mr-3 text-accent flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
            <Button variant="link" onClick={resetForm} className="mt-4">
              Obtenir de nouvelles recommandations
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
