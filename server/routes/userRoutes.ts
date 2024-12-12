import { Router, Request, Response } from 'express';
import type { RequestHandler } from 'express';
import { loginUser, registerUser, forgotPassword, resetPassword, logoutUser, adminLogin } from '../controllers/userController';

const router = Router();

// Route for user login
router.post('/login', loginUser as RequestHandler);

// Route for user registration
router.post('/register', registerUser as RequestHandler);

// Route for forgot password
router.post('/forgot-password', forgotPassword as RequestHandler);

// Route for resetting password
router.post('/reset-password', resetPassword as RequestHandler);

// Route for user logout
router.post('/logout', logoutUser as RequestHandler);

// Route for Admin login
router.post('/admin/login', adminLogin as RequestHandler);

export default router;
 
 
 
