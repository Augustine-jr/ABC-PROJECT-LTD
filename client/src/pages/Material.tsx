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
import { productAPI } from '../services/api';

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
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const initialProducts = await productAPI.getProducts();
        setFilterProducts(initialProducts);
      } catch (error) {
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const applyFilter = async () => {
    const min = Number(minPrice);
    const max = Number(maxPrice);

    if (
      (minPrice && isNaN(min)) ||
      (maxPrice && isNaN(max)) ||
      (minPrice && maxPrice && min > max) ||
      (min < 0 || max < 0)
    ) {
      toast.error('Invalid price range. Please check your inputs.');
      return;
    }

   try {
      setLoading(true);
      const response = await productAPI.getProducts({
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        categories: selectedCategories.length ? selectedCategories.join(',') : undefined,
        sort: sortOption,
      });

      setFilterProducts(response);
      toast.success('Filter applied successfully!');
    } catch (error) {
      toast.error('Error applying filters');
    } finally {
      setLoading(false);
    }
  }
  
  const resetFilters = async () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedCategories([]);
    setSortOption('relevant');
    try {
      const initialProducts = await productAPI.getProducts();
      setFilterProducts(initialProducts);
      toast.info('Filters have been reset');
    } catch (error) {
      toast.error('Error resetting filters');
    }
  };

  const handleSort = async (value: string) => {
    setSortOption(value);
    try {
      setLoading(true);
      const response = await productAPI.getProducts({
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        categories: selectedCategories.length ? selectedCategories.join(',') : undefined,
        sort: value,
      });
      setFilterProducts(response);
    } catch (error) {
      toast.error('Error sorting products');
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
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
  <div className="flex justify-center items-center w-full h-full">
    <Loader /> {/* Make sure your Loader component has enough visual feedback */}
  </div>
) : filterProducts.length === 0 ? (
  <div className="text-center py-4">No products found!</div>
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
