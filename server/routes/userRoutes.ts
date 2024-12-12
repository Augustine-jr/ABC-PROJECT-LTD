import express from 'express';
import {  loginUser,  registerUser,  forgotPassword,  resetPassword,  logoutUser,  adminLogin } from '../controllers/userController';
  
const userRouter = express.Router();

// Route for user login
userRouter.post('/login', loginUser);

// Route for user registration
userRouter.post('/register', registerUser);

// Route for forgot password (sending password reset link)
userRouter.post('/forgot-password', forgotPassword);

// Route for resetting password
userRouter.post('/reset-password', resetPassword);

// Route for user logout
userRouter.post('/logout', logoutUser);

// Route for Admin login
userRouter.post('/admin/login', adminLogin);

export default userRouter;
 
 
 
