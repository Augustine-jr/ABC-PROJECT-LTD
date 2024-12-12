import React from 'react';

// CategoryFilter component renders a list of categories with checkboxes for selection
interface CategoryFilterProps {
  categories: string[]; // List of all available categories
  selectedCategories: string[]; // List of categories that are currently selected
  toggleCategory: (category: string) => void;  // Function to toggle the selection of categories
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategories, toggleCategory }) => (
  <div className="border border-[#d1c7a3] pl-5 py-3 mt-6">
    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
      {categories.map((category) => (
        <label key={category} className="flex gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-3"
            checked={selectedCategories.includes(category)}  // Check if category is selected
            onChange={() => toggleCategory(category)} // Toggle category selection on change
          />
          {category}
        </label>
      ))}
    </div>
  </div>
);

export default CategoryFilter;