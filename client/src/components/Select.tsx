import React, { useState } from 'react';

// Defining the types for the props of the Select component.
interface SelectProps {
  value: string; // The current value of the select dropdown
  onValueChange: (value: string) => void; // Function to handle when the vakyue changes
  children: React.ReactNode; // The children of the select component, which will be the items
  className?: string; // Optional class for custom styling
}


// Select component that renders the dropdown
export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  // State to track whether the dropdown is open or closed
  const [isOpen, setIsOpen] = useState(false);

  return (
    // The main container of the dropdown, positioned relative to allow absolute positioning of the list.
    <div className="relative inline-block text-left">
      <div>
        {/* The button that triggers the dropdown when clicked */}
        <button
          onClick={() => setIsOpen((prev) => !prev)} // Toggle the dropdown open/close
          className="bg-white border border-gray-300 rounded px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          {value || 'Select an option'} {/* Display the current value or a placeholder */}
        </button>
      </div>

      {/* Display the current value or a placeholder */}
      {isOpen && (
        <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
           {/* Mapping through children and cloning them to pass extra props */}
          {React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement<any>, { onValueChange, setIsOpen })
          )}
        </div>
      )}
    </div>
  );
};

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;

  setIsOpen?: (isOpen: boolean) => void;
   className?: string;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children, onValueChange, setIsOpen, className }) => (
  <div
    onClick={() => {
      onValueChange?.(value);
      setIsOpen?.(false);
    }}
    className={`cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${className}`}
  >
    {children}
  </div>
);

export const SelectTrigger: React.FC<{ children: React.ReactNode;  className?: string  }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const SelectValue: React.FC<{ placeholder?: string;  className?: string  }> = ({ placeholder, className }) => (
  <span className={className}>{placeholder}</span>
);

export const SelectContent: React.FC<{ children: React.ReactNode;  className?: string  }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);
