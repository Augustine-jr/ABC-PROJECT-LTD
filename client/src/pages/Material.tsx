import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ShopContextType } from '../types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../assets/assets';
import axios, { AxiosError } from 'axios';
import Title from '../components/Title';
import { Product } from '../types';
import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader';
import CategoryFilter from '../components/CategoryFilter';
import PriceFilter from '../components/PriceFilter';

const CATEGORIES = ['Timber', 'Plywood', 'Nails', 'Leather', 'Other Materials'];

const Material = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('Material component must be used within a ShopContextProvider');
  }

  const { products, search, showSearch } = context;

  const [showFilter, setShowFilter] = useState(false); // State for showing or hiding filters on small screens
  const [minPrice, setMinPrice] = useState<string>(''); // Minimum price filter state
  const [maxPrice, setMaxPrice] = useState<string>(''); // Maximum price filter state
  const [loading, setLoading] = useState(false); // Loading state while filtering
  const [filterProducts, setFilterProducts] = useState<Product[]>([]); // Filtered products state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Selected categories state
  const [sortOption, setSortOption] = useState<string>('relevant'); // Sorting option for the products

  useEffect(() => {
    setFilterProducts(products); // On component mount, set filtered products to all products
  }, [products]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category) // If already selected, remove category
        : [...prev, category]  // Else, add the category to selected categories
    );
  };

  const applyFilter = async () => {
    const min = Number(minPrice);
    const max = Number(maxPrice);

    if ((minPrice && min < 0) || (maxPrice && max < 0) || (minPrice && maxPrice && min > max)) {
      toast.error('Invalid price range. Please check your inputs.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get('/api/products', {
        params: {
          minPrice: minPrice ? min : undefined, // Send minPrice if provided
          maxPrice: maxPrice ? max : undefined, // Send maxPrice if provided
          categories: selectedCategories.length ? selectedCategories.join(',') : undefined, // Send selected categories
        },
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        setFilterProducts(response.data); // Update filtered products based on API response
        toast.success('Filter applied successfully!');
      } else {
        toast.error('Unexpected response format');
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      // Handle errors from the API using status codes
      if (axiosError.response) {
        const statusCode = axiosError.response.status;
        switch (statusCode) {
          case 400:
            toast.error('Bad request. Please check the filter inputs.');
            break;
          case 404:
            toast.error('No products found with the given criteria.');
            break;
          case 500:
            toast.error('Server error. Please try again later.');
            break;
          default:
            toast.error(`An error occurred: ${statusCode}`);
        }
      } else if (axiosError.request) {
        toast.error('No response from the server. Please try again later.');
      } else {
        toast.error('An error occurred while setting up the request.');
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  const resetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategories([]);
    setShowFilter(false);
    setSortOption('relevant');
    setFilterProducts(products);
    toast.info('Filters have been reset');
  };

  const handleSort = (value: string) => {
    setSortOption(value);
    const sorted = [...filterProducts];

    // Sorting logic
    switch (value) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        setFilterProducts(products);
        return;
    }
    setFilterProducts(sorted); // Update filtered products after sorting
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t">
      {/* Sidebar Filter */}
      <div className="min-w-60">
        <div className="hidden lg:block">
          <CategoryFilter
            categories={CATEGORIES}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
          />
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            applyFilter={applyFilter}
            resetFilters={resetFilters}
            loading={loading}
          />
        </div>
        {/* Filters toggle button for small screens */}
        <div className="lg:hidden">
          <p
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
            onClick={() => setShowFilter(!showFilter)}
          >
            FILTERS
            <img
              className={`h-3 sm:hidden ${showFilter ? '' : '-rotate-90'}`}
              src={assets.dropdown_icon}
              alt="Dropdown Logo"
            />
          </p>
          {showFilter && (
            <>
              <CategoryFilter
                categories={CATEGORIES}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
              />
              <PriceFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                applyFilter={applyFilter}
                resetFilters={resetFilters}
                loading={loading}
              />
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'Materials'} />
          <select
            className=" py-1 border-2 border-[#d1c7a3] text-sm px-2 bg-inherit"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
        {loading ? (
          <Loader />
        ) : filterProducts.length === 0 ? (
          <p>No products found!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 divide-[#d1c7a3] divide-y md:divide-y-0 border-[#d1c7a3] border-y divide-x">
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Material;
