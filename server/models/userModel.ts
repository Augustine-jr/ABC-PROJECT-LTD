import mongoose from "mongoose";

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
  createdAt: {
    type: Date,
    default: Date.now, // Sets default account creation date
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
