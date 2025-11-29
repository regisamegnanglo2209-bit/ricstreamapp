import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CountdownTimer from '@/components/countdown-timer';
import AiAssistant from '@/components/ai-assistant';
import { ArrowRight, Tv, Smartphone, ShieldCheck } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';

const heroImage = placeholderImages.find(p => p.id === 'hero-stadium');

const benefits = [
  {
    icon: <Tv className="h-10 w-10 text-primary" />,
    title: 'Tous les sports, un seul endroit',
    description: 'Des ligues locales aux championnats internationaux, accédez à tous les matchs que vous aimez.',
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: 'Streamez n\'importe où',
    description: 'Profitez d\'un streaming fluide sur votre téléphone, tablette ou smart TV avec notre application dédiée.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Sécurisé & Fiable',
    description: 'Notre service est soutenu par des passerelles de paiement sécurisées et une technologie de streaming fiable.',
  },
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
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="container relative z-20 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary animate-fade-in-down">
              Le Match Est Lancé. Et Vous?
            </h1>
            <p className="max-w-[700px] text-lg text-gray-200 md:text-xl">
              Débloquez un accès instantané à des milliers de chaînes sportives en direct. Ne manquez plus un seul moment de l'action.
            </p>
            <div className="flex flex-col items-center space-y-4">
              <p className="text-accent font-semibold text-lg">Offre à durée limitée se terminant dans :</p>
              <CountdownTimer targetDate={offerEndDate.toISOString()} />
              <Button asChild size="lg" className="group bg-primary hover:bg-yellow-400 text-primary-foreground text-lg">
                <Link href="/checkout">
                  Obtenez un accès instantané
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card key={index} className="flex flex-col items-center text-center p-6 border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="flex flex-col items-center space-y-4">
                  {benefit.icon}
                  <h3 className="text-2xl font-bold font-headline">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
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
          <Button asChild size="lg" className="group bg-primary hover:bg-yellow-400 text-primary-foreground text-lg mt-4">
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
