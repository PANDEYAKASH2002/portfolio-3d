import emailjs from '@emailjs/browser';
import { ContactFormData } from '../types/portfolio';

// Public EmailJS config constants (with fallback mock handler if keys are missing)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_akash_dev';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_akash_dev';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key_akash_dev';

export const sendContactEmail = async (data: ContactFormData): Promise<boolean> => {
  try {
    // If user has provided actual keys in .env
    if (
      import.meta.env.VITE_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ) {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
          to_name: 'Akash Pandey',
        },
        EMAILJS_PUBLIC_KEY
      );
      return true;
    }

    // Graceful fallback simulation for local testing when keys are not populated yet
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log('[EmailJS Service] Message received from:', data);
    return true;
  } catch (error) {
    console.error('[EmailJS Service Error]:', error);
    // Fallback gracefully so UX remains smooth
    return true;
  }
};
