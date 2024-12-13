import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true, // Removes any leading/trailing whitespaces
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensures price is non-negative
  },
  image: {
    type: [String],
    required: true,
    validate: {
      validator: (images: string[]) => images.length > 0, // Add string[] type
      message: "At least one image URL is required.",
    },
  },
  category: {
    type: String,
    required: true,
    trim: true,
     enum: ['Timber', 'Plywood', 'Nails', 'Leather', 'Other Materials']
  },
  subCategory: {
    type: String,
    required: true,
    trim: true,
  },
  sizes: {
    type: [String],
    required: true,
    validate: {
      validator: (sizes: string[]) => sizes.length > 0, // Add string[] type
      message: "At least one size is required.",
    },
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  discount: {
    type: Number,
    required: true,
    min: 0, // Ensures discount is non-negative
    max: 100, // Ensures discount doesn't exceed 100%
  },
  bestseller: {
    type: Boolean,
    required: true,
      default: false,
  },
});

const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default productModel;