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
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const moneyFusionApiUrl = process.env.MONEYFUSION_API_URL;

    if (!moneyFusionApiUrl) {
        console.error("L'URL de l'API MoneyFusion n'est pas définie dans les variables d'environnement.");
        return {
            errors: {},
            message: 'Le service de paiement est actuellement indisponible. Configuration manquante.',
            success: false,
        };
    }

    const paymentPayload = {
      totalPrice: 3900,
      article: [{ "PACKRICSTREAMING": 3900 }],
      personal_Info: [{
        orderId: orderNumber,
        email: email,
      }],
      numeroSend: phone,
      nomclient: name,
      return_url: `${appUrl}/checkout/success?order=${orderNumber}`,
      webhook_url: `${appUrl}/api/payment/webhook`,
    };

    try {
        const response = await fetch(moneyFusionApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentPayload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erreur de l'API MoneyFusion (response not ok):", errorText);
            return {
                errors: {},
                message: `Le service de paiement a retourné une erreur: ${response.statusText}`,
                success: false,
            };
        }

        const paymentData = await response.json();
        
        if (paymentData.statut === true && paymentData.url) {
            redirect(paymentData.url);
        } else {
             return {
                errors: {},
                message: `Erreur lors de l'initialisation du paiement: ${paymentData.message || 'Veuillez réessayer.'}`,
                success: false,
            };
        }

    } catch (error) {
        console.error("Erreur de l'API MoneyFusion (catch):", error);
        return {
            errors: {},
            message: 'Le service de paiement est actuellement indisponible.',
            success: false,
        };
    }
}
