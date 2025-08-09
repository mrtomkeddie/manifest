'use server';

import { z } from 'zod';

const emailSchema = z.string().email({ message: "Please enter a valid email address." });

export async function subscribeToMailerlite(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const validated = emailSchema.safeParse(email);

  if (!validated.success) {
    return {
      message: validated.error.errors[0].message,
      success: false,
    };
  }
  
  // In a real application, you would add your logic to push to the MailerLite API here.
  // For example:
  //
  // const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
  // const MAILERLITE_GROUP_ID = process.env.MAILERLITE_LEAD_GROUP_ID;
  //
  // await fetch('https://api.mailerlite.com/api/v2/groups/${MAILERLITE_GROUP_ID}/subscribers', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-MailerLite-ApiKey': MAILERLITE_API_KEY,
  //   },
  //   body: JSON.stringify({ email: validated.data, type: 'active' }),
  // });

  console.log(`Subscribing ${validated.data} to MailerLite with tag 'lead'`);
  
  return {
    message: "Thank you for subscribing! Your journey begins now. ✨",
    success: true,
  };
}
