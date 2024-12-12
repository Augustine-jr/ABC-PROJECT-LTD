import React, { useState, FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; 
import validator from 'validator';

const NewsLetterBox = () => {
  // This holds the email input from the user, explicitly typed as a string.
  const [email, setEmail] = useState<string>(''); 

  // This function runs when the form is submitted
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the page from refreshing when the form is submitted

    // Use validator to check if the email is valid
    if (!validator.isEmail(email)) {
      // Show an error message if email is invalid
      toast.error('Please enter a valid email address.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'custom-toast',
        progressClassName: 'custom-toast-progress',
      });
      return; // Exit if email is invalid
    }

    // Placeholder for checking if email already exists (static for now)
    const existingEmails = ['existing@email.com', 'another@existing.email.com'];
    if (existingEmails.includes(email)) {
      // Show an error if email is already registered
      toast.error('This email address is already registered.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'custom-toast', 
        progressClassName: 'custom-toast-progress'
      });
      return; // Exit if email is already registered
    }

    try {
      // Simulate sending the email to the backend (axios part)
      // You can uncomment this when you connect to a backend
      /*
      const response = await axios.post<{ success: boolean }>('https://yourbackend.com/api/subscribe', { email });
      
      if (response.status === 200) {
        // Show a success message if the email was successfully subscribed
        toast.success('You have successfully subscribed!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'custom-toast',
          progressClassName: 'custom-toast-progress'
        });
        setEmail(''); // Clear the email input after successful subscription
      } else {
        // Show an error if subscription failed
        toast.error('Failed to subscribe. Please try again later.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'custom-toast',
          progressClassName: 'custom-toast-progress'
        });
      }
      */

      // Simulate success for now
      toast.success('You have successfully subscribed!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'custom-toast',
        progressClassName: 'custom-toast-progress'
      });

      setEmail(''); // Clear the input after subscription

    } catch (error) {
      // Show an error message if something went wrong (e.g., network or server issues)
      toast.error('An error occurred. Please try again later.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'custom-toast', 
        progressClassName: 'custom-toast-progress'
      });
    }
  };

  return (
    <div className='text-center pt-8 '>
      <ToastContainer /> 

      <p className='text-lg sm:text-2xl md:text-3xl font-medium text-gray-800 pb-10'>
        Stay Updated with the Latest Building Materials and Offers
      </p>
      {/* Form to get the email */}
      <form onSubmit={onSubmitHandler} className="rounded-md border-2 border-solid border-[#d1c7a3] flex items-center max-w-md mx-auto">
        <input
          className="px-2 py-3 outline-none w-full sm:w-64 md:w-80 lg:w-[300px] font-normal text-base border-none flex-1 bg-[#ebe6d7] 
          focus:bg-[#ebe6d7] focus:outline-none focus:ring-0 focus:border-[#d1c7a3]" 
          name="email" 
          placeholder="Enter your email"
          type="email"
          value={email} 
          onChange={(event) => setEmail(event.target.value)} 
          required
        />
        <button className="bg-[#d1c7a3] text-black p-2 font-bold text-sm sm:text-base flex-shrink-0 py-4">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
