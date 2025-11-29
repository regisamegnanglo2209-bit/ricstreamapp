import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CountdownTimer from '@/components/countdown-timer';
import AiAssistant from '@/components/ai-assistant';
import { ArrowRight, Tv, Smartphone, ShieldCheck, CheckCircle } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';

const heroImage = placeholderImages.find(p => p.id === 'hero-stadium');

const benefits = [
    { text: "Accès à vie" },
    { text: "Aucun abonnement mensuel" },
    { text: "Tous les sports en direct (Football, Basketball, Boxe, MMA, etc.)" },
    { text: "Qualité optimale selon l’appareil" },
    { text: "Compatible smartphone, PC, TV" },
    { text: "Interface simple et rapide" },
    { text: "Guide d’installation inclus" },
    { text: "Assistance personnalisée" },
    { text: "Garantie satisfaction ou remboursement" }
];


export default function Home() {
  const offerEndDate = new Date();
  offerEndDate.setHours(offerEndDate.getHours() + 72);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt="Un stade de sport vibrant et énergique la nuit, rempli de fans en liesse et de lumières vives, transmettant l'excitation."
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover z-0"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="container relative z-20 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary animate-fade-in-down">
              FINIS LES ABONNEMENTS MENSUELS !
            </h1>
            <p className="max-w-[800px] text-lg text-gray-200 md:text-xl">
              REGARDE LE SPORT EN DIRECT À VIE POUR 3 900 FCFA
            </p>
            <div className="flex flex-col items-center space-y-4">
              <p className="text-accent font-semibold text-lg">Offre à durée limitée se terminant dans :</p>
              <CountdownTimer targetDate={offerEndDate.toISOString()} />
              <div className="text-2xl text-white my-4">
                Accès à vie pour seulement <span className="font-bold text-accent text-3xl">3 900 FCFA</span> <del className="text-muted-foreground text-xl">20 000 FCFA</del>
              </div>
              <Button asChild size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground text-lg">
                <Link href="/checkout">
                  Obtenir le PACKRICSTREAMING maintenant
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <p className="text-sm text-gray-400">Paiement sécurisé via MoneyFusion.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                    Découvrez ce que le PACKRICSTREAMING vous offre
                 </h2>
                 <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
                    Une solution complète pour ne plus jamais rater un match, sans les tracas et les coûts des abonnements traditionnels.
                 </p>
            </div>
            <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <span className="text-lg text-foreground">{benefit.text}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
         <div className="container px-4 md:px-6">
          <AiAssistant />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container flex flex-col items-center gap-4 px-4 text-center md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            Prêt à rejoindre l'action?
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Votre place au premier rang du monde du sport n'est qu'à un clic. Obtenez un accès à vie maintenant avant la fin du temps imparti!
          </p>
          <Button asChild size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground text-lg mt-4">
            <Link href="/checkout">
              Je suis prêt !
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
