import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

// Route for user login
const loginUser = async (req: Request, res: Response) => {

}

// Route for user registration
const registerUser = async (req: Request, res: Response) => {

}

// Route for user password reset request (forgot password)
const forgotPassword = async (req: Request, res: Response) => {
  // Handle forgot password logic
};

// Route for resetting user password
const resetPassword = async (req: Request, res: Response) => {
  // Handle reset password logic
};

// Route for user logout (invalidating JWT or session)
const logoutUser = async (req: Request, res: Response) => {
  // Logout logic
};

// Route for Admin login
const adminLogin = async (req: Request, res: Response) => {

}

export { logoutUser, resetPassword, forgotPassword, adminLogin, loginUser, registerUser };