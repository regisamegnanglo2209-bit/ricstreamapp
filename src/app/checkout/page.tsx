'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { processCheckoutAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Download, BookOpen, Phone, Loader2, AlertCircle, Tag } from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialState = {
  errors: {},
  message: '',
  success: false,
};

const uemoaCountries = [
  { code: '+229', name: 'Bénin', flag: '🇧🇯' },
  { code: '+226', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: '+225', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { code: '+245', name: 'Guinée-Bissau', flag: '🇬🇼' },
  { code: '+223', name: 'Mali', flag: '🇲🇱' },
  { code: '+227', name: 'Niger', flag: '🇳🇪' },
  { code: '+221', name: 'Sénégal', flag: '🇸🇳' },
  { code: '+228', name: 'Togo', flag: '🇹🇬' },
];


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Payer 3 900 FCFA & Obtenir l'Accès
    </Button>
  );
}

export default function CheckoutPage() {
  const [state, formAction] = useActionState(processCheckoutAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: state.message,
      });
    }
  }, [state, toast]);

  if (state.success) {
    return (
      <div className="container mx-auto max-w-2xl py-12 px-4 md:px-6">
        <Card className="animate-fade-in-up border-2 border-primary shadow-lg shadow-primary/20">
          <CardHeader className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="text-3xl font-bold text-primary">Achat Terminé !</CardTitle>
            <CardDescription className="text-lg">
              Bienvenue chez RicStreaming ! Votre accès est prêt.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground">
              Un e-mail de confirmation vous a été envoyé avec tout ce dont vous avez besoin pour commencer.
            </p>
            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="font-semibold text-lg text-center">Prochaines Étapes :</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-primary" />
                  <span>Téléchargez l'APK depuis le lien dans votre e-mail.</span>
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Suivez notre guide d'installation simple.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>Contactez notre support si vous avez besoin d'aide.</span>
                </li>
              </ul>
            </div>
            <Button asChild className="w-full" variant="outline">
                <Link href="/">Retour à l'accueil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center font-headline">Finalisez Votre Achat</CardTitle>
          <CardDescription className="text-center">
            Remplissez vos informations pour débloquer un accès à vie à RicStreaming.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-card border p-4 mb-6">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg flex items-center gap-2"><Tag className="h-5 w-5 text-primary"/>Résumé de la commande</h3>
                <div className="text-right">
                    <span className="text-2xl font-bold text-primary">3 900 FCFA</span>
                    <del className="text-sm text-muted-foreground ml-2">20 000 FCFA</del>
                </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Vous payez une seule fois et obtenez un accès à vie.</p>
          </div>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nom Complet</Label>
              <Input id="name" name="name" placeholder="John Doe" required />
              {state.errors?.name && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4"/> {state.errors.name[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Adresse Gmail</Label>
              <Input id="email" name="email" type="email" placeholder="vous@gmail.com" required />
              {state.errors?.email && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4"/> {state.errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Numéro de Téléphone</Label>
              <div className="flex gap-2">
                 <Select name="phone_prefix" defaultValue="+221">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Prefix" />
                    </SelectTrigger>
                    <SelectContent>
                      {uemoaCountries.map(country => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                <Input id="phone" name="phone_number" type="tel" placeholder="77 123 45 67" required className="flex-1" />
              </div>
              {state.errors?.phone && <p className="text-sm text-red-500 flex items-center gap-1 mt-2"><AlertCircle className="h-4 w-4"/> {state.errors.phone[0]}</p>}
            </div>
            <SubmitButton />
            <p className="text-xs text-center text-muted-foreground">
              Traitement de paiement sécurisé par MoneyFusion. En cliquant, vous acceptez nos Conditions de Service.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
