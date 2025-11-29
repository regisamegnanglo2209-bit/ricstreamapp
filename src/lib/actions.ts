'use server';

import { z } from 'zod';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-content-recommendations';
import { redirect } from 'next/navigation';

// AI Recommendation Action
export async function getRecommendationsAction(
  prevState: any,
  formData: FormData
) {
  const preference = formData.get('preference') as string;
  const trending = formData.get('trending') as string;

  try {
    const result = await getPersonalizedRecommendations({
      userPreferences: preference || undefined,
      trendingEvents: trending ? 'trending sports events' : undefined,
    });
    return {
      recommendations: result.recommendations,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      recommendations: [],
      error: 'Désolé, nous n\'avons pas pu obtenir de recommandations pour le moment. Veuillez réessayer plus tard.',
    };
  }
}

// Contact Form Action
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit comporter au moins 2 caractères.' }),
  email: z.string().email({ message: 'Veuillez saisir une adresse e-mail valide.' }),
  message: z.string().min(10, { message: 'Le message doit comporter au moins 10 caractères.' }),
});

export async function submitContactFormAction(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Veuillez corriger les erreurs et réessayer.',
      success: false,
    };
  }

  // TODO: Envoyer l'email ou sauvegarder le message
  console.log('Contact form submitted:', validatedFields.data);

  return {
    errors: {},
    message: 'Merci pour votre message ! Nous vous répondrons sous peu.',
    success: true,
  };
}


// Checkout Form Action
const checkoutSchema = z.object({
    name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
    email: z.string().email({ message: "Veuillez saisir une adresse Gmail valide." }).refine(email => email.endsWith('@gmail.com'), { message: "Seules les adresses Gmail sont acceptées." }),
    phone: z.string().min(7, { message: "Veuillez saisir un numéro de téléphone valide." }),
});

export async function processCheckoutAction(prevState: any, formData: FormData) {
    const phone_prefix = formData.get('phone_prefix');
    const phone_number = formData.get('phone_number');
    
    const fullPhoneNumber = `${phone_prefix}${phone_number}`.replace('+', '');

    const validatedFields = checkoutSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: fullPhoneNumber,
    });
    
    if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        return {
            errors: fieldErrors,
            message: "Veuillez corriger les erreurs ci-dessous.",
            success: false,
        };
    }
    
    const { name, email, phone } = validatedFields.data;
    const orderNumber = `RS-${Date.now()}`;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    try {
        const response = await fetch('https://api.moneyfusion.net/v1/payment/init', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: process.env.MONEYFUSION_API_KEY,
                amount: 3900,
                currency: 'XOF',
                description: `Paiement pour PACKRICSTREAMING - Commande ${orderNumber}`,
                customer_name: name,
                customer_email: email,
                customer_phone: phone,
                return_url: `${appUrl}/checkout/success?order=${orderNumber}`,
                cancel_url: `${appUrl}/checkout`,
                callback_url: `${appUrl}/api/payment/callback?order=${orderNumber}`,
                metadata: {
                  order_id: orderNumber,
                }
            })
        });

        const paymentData = await response.json();

        if (paymentData.status === 'success' && paymentData.data.payment_url) {
            redirect(paymentData.data.payment_url);
        } else {
             return {
                errors: {},
                message: `Erreur lors de l'initialisation du paiement: ${paymentData.message || 'Veuillez réessayer.'}`,
                success: false,
            };
        }

    } catch (error) {
        console.error("Erreur de l'API MoneyFusion:", error);
        return {
            errors: {},
            message: 'Le service de paiement est actuellement indisponible. Veuillez réessayer plus tard.',
            success: false,
        };
    }
}
