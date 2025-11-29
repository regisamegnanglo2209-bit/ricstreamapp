import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Comment installer l\'application RicStreaming ?',
    answer:
      'Après l\'achat, vous recevrez un e-mail avec un lien de téléchargement pour le fichier APK et un guide d\'installation étape par étape. Téléchargez simplement le fichier, autorisez l\'installation à partir de sources inconnues sur votre appareil Android et exécutez l\'installateur.',
  },
  {
    question: 'Quels sports et chaînes sont disponibles ?',
    answer:
      'RicStreaming propose une vaste collection de chaînes sportives du monde entier, couvrant le football, le basket-ball, le cricket, le tennis, les sports mécaniques et bien plus encore. Pour une demande de chaîne spécifique, veuillez contacter notre équipe de support.',
  },
  {
    question: 'Que faire si je rencontre des problèmes de streaming ?',
    answer:
      'La plupart des problèmes de streaming peuvent être résolus en vérifiant votre connexion Internet, en vidant le cache de l\'application ou en redémarrant l\'application. Notre guide d\'installation comprend également une section de dépannage. Si le problème persiste, notre équipe de support est disponible 24h/24 et 7j/7 pour vous aider.',
  },
  {
    question: 'Quelle est votre politique de remboursement ?',
    answer:
      'Nous offrons une garantie de remboursement de 7 jours. Si vous n\'êtes pas satisfait de notre service pour une raison quelconque dans les 7 premiers jours de votre achat, vous pouvez demander un remboursement complet, sans poser de questions.',
  },
    {
    question: 'Puis-je utiliser RicStreaming sur plusieurs appareils ?',
    answer:
      'Votre abonnement vous permet d\'utiliser RicStreaming sur un appareil à la fois. Cependant, vous pouvez installer l\'application sur plusieurs appareils et vous connecter au besoin.',
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Foire Aux Questions
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Trouvez des réponses aux questions courantes sur RicStreaming.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold text-left hover:text-primary">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
