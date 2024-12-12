import { Router } from 'express';
import { loginUser, registerUser, forgotPassword, resetPassword, logoutUser, adminLogin } from '../controllers/userController';

const router = Router();

// Route for user login
router.post('/login', loginUser);

// Route for user registration
router.post('/register', registerUser);

// Route for forgot password
router.post('/forgot-password', forgotPassword);

// Route for resetting password
router.post('/reset-password', resetPassword);

// Route for user logout
router.post('/logout', logoutUser);

// Route for Admin login
router.post('/admin/login', adminLogin);

export default router;
 
 
 
