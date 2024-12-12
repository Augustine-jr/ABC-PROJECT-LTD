import express, { RequestHandler } from 'express';
import { subscribeToNewsletter } from '../controllers/newsletterController';
import {  newsletterRateLimiter } from '../middleware/rateLimiter';

const router = express.Router();

router.post('/subscribe', newsletterRateLimiter, subscribeToNewsletter as RequestHandler);

export default router;
