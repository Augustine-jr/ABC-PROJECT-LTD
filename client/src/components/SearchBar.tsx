import React, { useContext, useEffect, useState } from 'react'
import { assets } from "../assets/assets";
import { ShopContextType } from '../types'; // Import the type for ShopContext
import { ShopContext } from '../context/ShopContext'; // Ensure you import the context
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

   const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
   const [visible, setVisible] = useState(false);
   const location = useLocation();

   useEffect(() => {
       if (location.pathname.includes('materials')) {
           setVisible(true);
       } else {
           setVisible(false);
       }
   }, [location]);

  return showSearch && visible ? (
    <div className='border-t border-b  border-[#d1c7a3] bg-inherit text-center'>
      <div className='inline-flex items-center justify-center border border-[#d1c7a3] px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
       <input value={search} onChange={(e) =>setSearch(e.target.value) } className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' /> 
       <img src={assets.search_icon} alt='Search Icon' className='w-4 cursor-pointer' />
      </div>
      <img onClick={() => setShowSearch(false)} className='inline w-5 cursor-pointer' src={assets.cross_icon} alt="X icon" />
    </div>
  ) : null
}
export default SearchBar