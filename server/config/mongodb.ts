import mongoose from "mongoose"; 
import dotenv from "dotenv"; 

// Load environment variables from the .env file
dotenv.config();

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the URI from the environment variables
    await mongoose.connect(`${process.env.MONGODB_URI}/ABC-Project-Limited`, {
  
    });

    // Log a message when the database connection is successful
    console.log("DB Connected Successfully");
  } catch (error: unknown) {
    // If an error occurs during connection, log the error message
    console.error("DB Connection Failed:", error instanceof Error ? error.message : String(error));

    // Exit the application with an error code (1 = failure)
    process.exit(1);
  }

  // Event listener: Logs when the database connection is re-established
  mongoose.connection.on("connected", () => {
    console.log("Reconnected to MongoDB");
  });

  // Event listener: Logs when the database connection is lost
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection lost. Retrying...");
  });
};

// Export the `connectDB` function so it can be used in other parts of the application
export default connectDB;
