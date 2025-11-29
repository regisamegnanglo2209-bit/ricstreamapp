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
    
    const fullPhoneNumber = `${phone_prefix}${phone_number}`.replace(/\+/g, '').replace(/\s/g, '');
    const orderId = `RS-${Date.now()}`;

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
            url: null,
        };
    }
    
    const moneyFusionApiUrl = process.env.MONEYFUSION_API_URL;
    if (!moneyFusionApiUrl) {
      console.error('MONEYFUSION_API_URL is not set');
      return {
        errors: {},
        message: 'Service de paiement indisponible.',
        success: false,
        url: null,
      };
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const paymentData = {
        totalPrice: 200,
        article: [{ "pack": 200 }],
        personal_Info: [{ userId: validatedFields.data.email, orderId: orderId }],
        numeroSend: validatedFields.data.phone,
        nomclient: validatedFields.data.name,
        return_url: `${appUrl}/checkout/success?order=${orderId}`,
        webhook_url: `${appUrl}/api/payment/webhook`,
    };

    try {
        const response = await fetch(moneyFusionApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        const result = await response.json();
        
        if (result.statut === true && result.url) {
            return {
              errors: {},
              message: 'Redirection vers le paiement...',
              success: true,
              url: result.url,
            }
        } else {
            console.error('MoneyFusion API Error:', result.message);
            return {
                errors: {},
                message: result.message || 'Une erreur est survenue lors de l\'initialisation du paiement.',
                success: false,
                url: null,
            };
        }
    } catch (error) {
        console.error('Failed to process payment:', error);
        return {
            errors: {},
            message: 'Service de paiement indisponible.',
            success: false,
            url: null,
        };
    }
}
