import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // For password hashing
import { CallbackError } from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function () {
      return this.accountType === "Sign Up";
    }, // Required only during Sign Up
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Ensure emails are unique
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum password length
    select: false, // Prevents password from being returned by default
  },
  cart: {
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
      },
    ],
    default: [],
  },
  accountType: {
    type: String,
    enum: ["Sign Up", "Login"], // Only allow Sign Up or login
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Sets default account creation date
  },
});


// Hash password before saving user to database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: unknown) {
    next(err as CallbackError);
  }
});

//Compare entered password with the hashed password stored in the database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};



const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
