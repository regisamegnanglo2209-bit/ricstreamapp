import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I install the RicStreaming app?',
    answer:
      'After purchase, you will receive an email with a download link for the APK file and a step-by-step installation guide. Simply download the file, allow installation from unknown sources on your Android device, and run the installer.',
  },
  {
    question: 'What sports and channels are available?',
    answer:
      'RicStreaming offers a vast collection of sports channels from around the world, covering football, basketball, cricket, tennis, motorsports, and much more. For a specific channel request, please contact our support team.',
  },
  {
    question: 'What if I encounter streaming issues?',
    answer:
      'Most streaming issues can be resolved by checking your internet connection, clearing the app cache, or restarting the app. Our installation guide also includes a troubleshooting section. If the problem persists, our support team is available 24/7 to assist you.',
  },
  {
    question: 'What is your refund policy?',
    answer:
      'We offer a 7-day money-back guarantee. If you are not satisfied with our service for any reason within the first 7 days of your purchase, you can request a full refund, no questions asked.',
  },
    {
    question: 'Can I use RicStreaming on multiple devices?',
    answer:
      'Your subscription allows you to use RicStreaming on one device at a time. However, you can install the app on multiple devices and log in as needed.',
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <HelpCircle className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-muted-foreground md:text-xl">
          Find answers to common questions about RicStreaming.
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
