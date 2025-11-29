'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'RS-XXXXX';

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4 md:px-6">
      <Card className="animate-fade-in-up border-2 border-primary shadow-lg shadow-primary/20">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl font-bold text-primary">Félicitations, votre commande est confirmée !</CardTitle>
          <CardDescription className="text-lg">
            Numéro de commande : <span className="font-semibold text-foreground">{orderNumber}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            Pour l’installation de l’application (APK), nous avons prévu un accompagnement sur-mesure : un agent vous prendra en charge personnellement afin de vous guider pas à pas.
          </p>
          <div className="space-y-4 rounded-lg border p-4 bg-card/50">
            <h3 className="font-semibold text-lg">Contactez le support pour finaliser l'installation</h3>
            <p className="text-sm text-muted-foreground">
              Votre agent sera là pour fournir le fichier, répondre à vos questions et s’assurer que tout fonctionne parfaitement.
            </p>
             <Button asChild size="lg">
                <Link href="https://wa.me/message/7SW4CJ5TBPHMI1" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contacter un agent sur WhatsApp
                </Link>
             </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Avec nos remerciements pour votre confiance,<br />
            L'équipe Support RICSTREAMING
          </p>
           <Button asChild className="w-full mt-4" variant="outline">
                <Link href="/">Retour à l'accueil</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}


export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <SuccessContent />
        </Suspense>
    )
}
