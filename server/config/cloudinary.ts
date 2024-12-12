import { v2 as cloudinary } from "cloudinary"; // Import the Cloudinary SDK

// Function to configure Cloudinary with environment variables
const connectCloudinary = async () => {
  try {
    // Configure Cloudinary using credentials from environment variables
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME, // Your Cloudinary cloud name
      api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API key
      api_secret: process.env.CLOUDINARY_SECRET_KEY, // Your Cloudinary secret key
    });

    // Log a success message when configuration is complete
    console.log("Cloudinary configuration successful ✅");
  } catch (error: any) {
    // Catch and log any errors that occur during the configuration
    console.error("Failed to configure Cloudinary ❌:", error.message);

    // Optionally, you can throw the error or exit the process
    throw new Error("Cloudinary configuration failed");
  }
};

export default connectCloudinary; // Export the function for use in other files
