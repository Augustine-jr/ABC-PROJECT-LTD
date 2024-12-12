import React from 'react';
import clsx from 'clsx'; // Utility for conditionally joining class names

// Define the props for the Button component, extending native button props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive'; // Style variants
  size?: 'sm' | 'md' | 'lg'; // Size options
}

// The Button component with optional variant and size props
const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', // Default variant is primary
  size = 'md', // Default size is medium
  className,  // Additional custom className
  ...props // Spread operator for additional button props
}) => {
  // Base styles for all buttons
  const baseStyles = 'font-semibold rounded focus:outline-none transition';

  // Style variations based on the `variant` prop
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500', // Primary button styles
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-500',// Secondary button styles
    destructive: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:ring-red-500',// Destruction (danger) styles
  };


  const responsiveStyles = {
    sm: 'w-full',
    md: 'w-auto',
    lg: 'w-auto',
  };

  // Size variations based on the `size` prop
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm', // Small size
    md: 'px-4 py-2 text-base',// Medium size
    lg: 'px-6 py-3 text-lg', // Large size
  };

  return (
    // Combine all classes dynamically using `clsx` for modular styling
    <button 
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], responsiveStyles[size], className)} 
      {...props} 
    />
  );
};

export default Button;
