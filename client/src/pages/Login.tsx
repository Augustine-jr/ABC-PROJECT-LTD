import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'; // `Eye` and `EyeOff` are icons for showing/hiding passwords.
import { motion, AnimatePresence } from 'framer-motion';// `motion` and `AnimatePresence` are used for animations with Framer Motion.

const Login = () => {
   // State to track whether the form is in "Sign Up" or "Login" mode.
  const [currentState, setCurrentState] = useState('Login');

   // State to track whether the form is processing data (loading).
  const [loading, setLoading] = useState(false);

   // State to track if an error occurs during submission.
  const [error, setError] = useState<string | null>(null);

  // State to toggle showing/hiding the password.
  const [showPassword, setShowPassword] = useState(false);

   // Handler for form submission.
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();// Prevents the default form behavior in this case: page reload).
      setLoading(true); // Sets loading to true while processing the form submission.
      try {
        setError(null); // Clear any existing error messages.
        const formData = new FormData(event.currentTarget); // Collect form data.
        const data = {
           name: formData.get('name'),  // Extracts the "name" field value.
           email: formData.get('email'),  // Extracts the "email" field value.
           password: formData.get('password'), // Extracts the "password" field value.
        }
          console.log(data); // Logs the form data to the console.
          // Simulate API call to register user here
      } catch (err) {
        setError('An error occurred while trying to register.');// Sets an error message if the operation fails.
      } finally {
        setLoading(false); // Sets loading to false after processing is done.
      }
  
  }
    // Animation settings for form transitions.
  const transitionVariants = {
    initial: { opacity: 0, x: 50 }, // Starts offscreen (to the right) and invisible.
    animate: { opacity: 1, x: 0 },  // Moves to its position and becomes visible.
    exit: { opacity: 0, x: -50 },   // Moves offscreen (to the left) and disappears.
  };

 return (
    <form
      onSubmit={onSubmitHandler} // Attach the submission handler to the form.
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 "
      // Flexbox for centering and styling the form.
    >
      <div className="inline-flex items-center gap-2 mb-4 mt-10">
        <motion.p
          className="text-3xl font-semibold"
          initial={{ opacity: 0, y: -10 }} // Starts slightly above and invisible.
          animate={{ opacity: 1, y: 0 }} // Moves to its position and becomes visible.
          transition={{ duration: 0.3 }} // Animation duration is 0.3 seconds.
        >
          {currentState} {/* Displays "Sign Up" or "Login" based on the state. */}
        </motion.p>
      </div>

      {/* Use AnimatePresence to handle animations when switching between "Sign Up" and "Login" states. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentState} // Ensure unique key for state transitions.
          variants={transitionVariants} // Use defined animation variants.
          initial="initial" // Start with the "initial" animation state.
          animate="animate" // Transition to the "animate" state.
          exit="exit" // When leaving, use the "exit" animation state.
          transition={{ duration: 0.5 }} // Animation duration for transitions.
          className="w-full"
        >
          {/* Render the "name" field only in "Sign Up" mode. */}
          {currentState === 'Sign Up' && (
            <motion.input
              type="text"
              placeholder="Name"
              name="name" // Name used to identify the input field in the form data.
              className="w-full px-3 py-2 border bg-inherit border-[#d1c7a3] mb-2"
              required // Makes this field mandatory.
            />
          )}
          <motion.input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full px-3 py-2 border mb-2 bg-inherit border-[#d1c7a3]"
            required
          />
          <div className="relative w-full">
            <motion.input
              type={showPassword ? 'text' : 'password'} // Toggle between text and password types.
              placeholder="Password"
              name="password"
              className="w-full px-3 py-2 border bg-inherit border-[#d1c7a3]"
              required
            />
            {/* Button to toggle password visibility */}
            <button
              type="button" // Button type, so it doesn't submit the form.
              aria-label={showPassword ? 'Hide password' : 'Show password'} // Accessibility label.
              onClick={() => setShowPassword(!showPassword)} // Toggle the password visibility.
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
               // Position the button inside the password input field.
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              {/* Show the Eye icon if the password is visible, and EyeOff if hidden. */}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="w-full flex justify-between text-sm mt-2">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')} // Switch to "Sign Up" mode.
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')} // Switch to "Login" mode.
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>

      {/* Display an error message if one exists. */}
      {error && <p className="text-red-500">{error}</p>}
      <motion.button
        disabled={loading} // Disable the button while loading.
        className={`bg-black text-white font-light px-8 py-2 mt-4 ${
          loading && 'opacity-50 cursor-not-allowed'
        }`}
        whileHover={{ scale: 1.05 }} // Slightly enlarge button on hoverrr.
        whileTap={{ scale: 0.95 }}  // Slightly shrink button on click.
      >
        {loading ? 'Processing...' : currentState === 'Login' ? 'Sign In' : 'Sign Up'}
         {/* Show appropriate text based on loading and current state. */}
      </motion.button>
    </form>
  );
};

export default Login; //export