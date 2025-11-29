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
      error: 'Sorry, we couldn\'t get recommendations at this time. Please try again later.',
    };
  }
}

// Contact Form Action
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
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
      message: 'Please correct the errors and try again.',
      success: false,
    };
  }

  // Simulate sending an email or saving to a database
  console.log('Contact form submitted:', validatedFields.data);

  return {
    errors: {},
    message: 'Thank you for your message! We will get back to you shortly.',
    success: true,
  };
}


// Checkout Form Action
const checkoutSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid Gmail address." }).refine(email => email.endsWith('@gmail.com'), { message: "Only Gmail addresses are accepted." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
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
            message: "Please correct the errors below.",
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
        message: "Your purchase was successful!",
        success: true,
    };
}
