'use server';

import { z } from 'zod';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-content-recommendations';

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

  // Simulate sending an email or saving to a database
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
    phone: z.string().min(10, { message: "Veuillez saisir un numéro de téléphone valide." }),
});

export async function processCheckoutAction(prevState: any, formData: FormData) {
    const validatedFields = checkoutSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Veuillez corriger les erreurs ci-dessous.",
            success: false,
        };
    }
    
    // Here you would integrate with MoneyFusion payment gateway
    // and trigger the email delivery on success.
    // We'll simulate a successful transaction.
    console.log("Processing payment for:", validatedFields.data);
    
    // Simulate email sending
    console.log(`Sending APK, guide, and contact details to ${validatedFields.data.email}`);

    return {
        errors: {},
        message: "Votre achat a été effectué avec succès !",
        success: true,
    };
}
