import React from 'react';

// PriceFilter component allows the user to filter products by price range
interface PriceFilterProps {
  minPrice: string; // Minimum price filter value
  maxPrice: string; // Maximum price filter value
  setMinPrice: (value: string) => void; // Function to update minimum price
  setMaxPrice: (value: string) => void; // Function to update maximum price
  applyFilter: () => void; // Function to apply the price filter
  resetFilters: () => void; // Function to reset all filters
  loading: boolean; // Loading state to handle button text during API requests
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  applyFilter,
  resetFilters,
  loading,
}) => {
  const isPriceRangeEmpty = !minPrice && !maxPrice; // Check if both price fields are empty

return (
  <div className="border border-[#d1c7a3] pl-5 py-3 my-5">
   <p className="mb-3 text-sm font-medium">Price Range</p>
    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min Price"
          aria-label="Minimum Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)} //  Update minimum price on change  
          className="border border-[#d1c7a3] px-2 py-1 w-[98px] bg-white"
        />
        <input
          type="number"
          placeholder="Max Price"
          aria-label="Maximum Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)} // Update maximum price on change
          className="border border-[#d1c7a3] px-2 py-1 w-[98px] bg-white text-black"
        />
      </div>
      <button
        onClick={applyFilter} // Apply filter when clicked
        className="mt-3 bg-[#d1c7a3] text-black rounded-md py-2 mr-4 px-4 hover:bg-[#bfb292] transition-all duration-200"
        disabled={loading || isPriceRangeEmpty}  // Disable button if loading or price range is empty
      >
        {loading ? 'Filtering...' : 'Apply Filter'}
      </button>
      <button
        onClick={resetFilters} // Reset all filters when clicked
        className="mt-3 bg-gray-300 text-black rounded-md py-2 mr-4 px-4 hover:bg-gray-400 transition-all duration-200"
        disabled={isPriceRangeEmpty} // Disable button if price range is empty
      >
        Reset Filters
      </button>
    </div>
  </div>
   )
}
 


export default PriceFilter;
