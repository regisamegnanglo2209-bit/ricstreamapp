'use client';

import { useFormStatus } from 'react-dom';
import { useActionState, useEffect, useRef } from 'react';
import { submitContactFormAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageCircle, Phone, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const initialState = {
  errors: {},
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Envoyer le message
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useActionState(submitContactFormAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Succès !' : 'Erreur',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <Mail className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Contactez-nous
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Nous sommes là pour vous aider. Contactez-nous pour toute question ou problème.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Envoyez-nous un message</CardTitle>
            <CardDescription>Notre équipe vous répondra dans les 24 heures.</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input id="name" name="name" placeholder="Votre Nom" />
                {state.errors?.name && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {state.errors.name[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" placeholder="votre.email@exemple.com" />
                {state.errors?.email && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {state.errors.email[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Comment pouvons-nous vous aider ?" />
                {state.errors?.message && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> {state.errors.message[0]}</p>}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold font-headline">Support Direct</h2>
          <p className="text-muted-foreground">
            Pour une assistance immédiate, veuillez utiliser l'une des options ci-dessous.
          </p>
          <div className="space-y-4">
            <Button asChild variant="outline" className="w-full justify-start text-lg p-6">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-4 h-6 w-6 text-primary" />
                Chat en direct
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start text-lg p-6">
              <Link href="#" target="_blank" rel="noopener noreferrer">
                <Phone className="mr-4 h-6 w-6 text-primary" />
                Contacter sur WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
