// controllers/newsletterController.ts
import { Request, Response } from 'express';
import NewsletterSubscriber from '../models/newsletterSubscriberModel';
import validator from 'validator';

export const subscribeToNewsletter = async (req: Request, res: Response) => {
  const { email } = req.body;
  const clientIp = req.ip; // Get client IP address

  // Validate email
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

   try {
    // Check if email already exists
    const existingSubscriber = await NewsletterSubscriber.findOne({ 
      email: email.toLowerCase().trim() 
    });

    if (existingSubscriber) {
      return res.status(400).json({ message: 'This email is already subscribed' });
    }

    // Create new subscriber
    const newSubscriber = new NewsletterSubscriber({ 
      email: email.toLowerCase().trim() 
    });

    await newSubscriber.save();

    res.status(201).json({ 
      message: 'Successfully subscribed to newsletter', 
       subscriber: { email: newSubscriber.email }  
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      message: 'An error occurred while subscribing', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};
