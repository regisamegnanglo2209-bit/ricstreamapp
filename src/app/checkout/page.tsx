'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { processCheckoutAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Download, BookOpen, Phone, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const initialState = {
  errors: {},
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Pay & Get Instant Access
    </Button>
  );
}

export default function CheckoutPage() {
  const [state, formAction] = useFormState(processCheckoutAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        variant: 'destructive',
        title: 'Error',
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
            <CardTitle className="text-3xl font-bold text-primary">Purchase Complete!</CardTitle>
            <CardDescription className="text-lg">
              Welcome to RicStreaming! Your access is ready.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground">
              A confirmation email has been sent to you with everything you need to get started.
            </p>
            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="font-semibold text-lg text-center">Next Steps:</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-primary" />
                  <span>Download the APK from the link in your email.</span>
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Follow our simple installation guide.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>Contact our support team if you need any help.</span>
                </li>
              </ul>
            </div>
            <Button asChild className="w-full" variant="outline">
                <Link href="/">Back to Home</Link>
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
          <CardTitle className="text-3xl font-bold text-center font-headline">Complete Your Purchase</CardTitle>
          <CardDescription className="text-center">
            Fill in your details to unlock lifetime access to RicStreaming.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required />
              {state.errors?.name && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4"/> {state.errors.name[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Gmail Address</Label>
              <Input id="email" name="email" type="email" placeholder="you@gmail.com" required />
              {state.errors?.email && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4"/> {state.errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+1234567890" required />
              {state.errors?.phone && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="h-4 w-4"/> {state.errors.phone[0]}</p>}
            </div>
            <SubmitButton />
            <p className="text-xs text-center text-muted-foreground">
              Secure payment processing by MoneyFusion. By clicking, you agree to our Terms of Service.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
