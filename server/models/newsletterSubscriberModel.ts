import mongoose from "mongoose";

const newsletterSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  subscribedFromIp: {
    type: String,
    required: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
});


const NewsletterSubscriber = mongoose.models.NewsletterSubscriber || 
  mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);

export default NewsletterSubscriber; 