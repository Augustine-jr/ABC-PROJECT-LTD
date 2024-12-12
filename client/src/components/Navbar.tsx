import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets"; // import for assests
import { motion, AnimatePresence } from "framer-motion"; // Import for animation effects
import { ShopContext } from "../context/ShopContext"; // Import context for app-wide state

const Navbar = () => {
  const [visible, setVisible] = useState(false); // State to control mobile menu visibility
  const [menuActive, setMenuActive] = useState(false); // State to toggle menu active status
  const location = useLocation(); // Hook to get current route

  const { setShowSearch, getCartCount } = useContext(ShopContext); // Get context values for search and cart count

  // Function to toggle mobile menu visibility and control body scroll
  const toggleMenu = () => {
    setVisible(!visible); // Toggle the visibility of the mobile menu
    setMenuActive(!menuActive); // Toggle the active state of the menu
    document.body.style.overflow = visible ? "hidden" : "auto"; // Disable/enable body scroll when menu is open
  };

  // Reset body scroll when route changes (for page transitions)
  useEffect(() => {
    document.body.style.overflow = "auto"; // Ensure scroll is always enabled when route changes
  }, [location]); // Dependency on location to detect when route changes

  // Define motion variants for sidebar animation (sliding in/out)
  const sidebarVariants = {
    hidden: { x: "100%" }, // Sidebar starts off-screen
    visible: { x: 0, transition: { type: "spring", stiffness: 120 } }, // Sidebar slides in smoothly
    exit: { x: "100%", transition: { type: "spring", stiffness: 120 } }, // Sidebar slides out smoothly
  };

  return (
    <div>
      {/* Navbar container with motion for slide-down effect */}
      <motion.div
        className="flex items-center justify-between transition-all duration-300"
        initial={{ y: -100 }} // Start off-screen above
        animate={{ y: 0 }} // Slide into place
        transition={{ duration: 0.5, ease: "easeInOut" }} // Animation settings
      >
        <div className="flex justify-between w-full items-center py-5 px-12 font-bold">
          {/* Logo */}
          <Link to="/">
            <motion.img
              src={assets.ABC_Logo}
              alt="ABC Logo"
              className="w-[100px] md:w-40"
              animate={{ opacity: 0.8 }} // Fade in the logo
              transition={{ duration: 0.5 }} // Animation duration
            />
          </Link>

          {/* Desktop menu */}
          <motion.ul className="hidden sm:flex gap-5 text-sm text-gray-700">
            {["HOME", "MATERIALS", "ABOUT", "CONTACT"].map((text) => (
              <NavLink
                key={text} // Key for list item to maintain stability
                to={text.toLowerCase() === "home" ? "/" : `/${text.toLowerCase()}`} // Determine the correct path
                className="flex flex-col items-center gap-1 relative"
              >
                <motion.p
                  initial={{ color: "#999999" }} // Start with a lighter color
                  animate={{ color: "#333333" }} // Animate to a darker color
                  transition={{ duration: 0.5 }} // Animation duration
                >
                  {text} {/* Render text for each nav item */}
                </motion.p>
                {/* Show an underline when the current page matches the link */}
                {window.location.pathname ===
                  (text.toLowerCase() === "home" ? "/" : `/${text.toLowerCase()}`) && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ebe6d7] via-[#d1c7a3] to-[#645832] transition-all duration-300" />
                )}
              </NavLink>
            ))}
          </motion.ul>

          {/* Icons for search, profile, and cart */}
          <div className="flex items-center gap-6 justify-between">
            {/* Search Icon */}
            <motion.img
              onClick={() => setShowSearch(true)} // Trigger search visibility
              src={assets.search_icon}
              alt="Search Icon"
              className="w-7 cursor-pointer"
              animate={{ opacity: 0.8 }} // Animate opacity for smooth effect
              transition={{ duration: 0.5 }} // Animation duration
            />

            {/* Profile Icon with dropdown */}
            <div className="group relative">
              <Link to="/login"><motion.img
                className="w-7 cursor-pointer"
                src={assets.profile_icon}
                alt="Profile Icon"
                animate={{ opacity: 0.8 }} // Animate opacity for profile icon
                transition={{ duration: 0.5 }} // Animation duration
              /></Link>
              {/* Dropdown menu for profile */}
              <div className="group-hover:block hidden absolute z-50 dropdown-menu right-0 pt-4 bg-[#d1c7a3] rounded">
                <div className="flex flex-col gap-2 w-36 py-3 px-5 text-gray-700 rounded">
                  <p className="cursor-pointer explore hover:text-black">My Profile</p>
                  <p className="cursor-pointer explore hover:text-black">Orders</p>
                  <p className="cursor-pointer explore hover:text-black">Logout</p>
                </div>
              </div>
            </div>

            {/* Cart Icon with cart count */}
            <Link to="/cart" className="relative">
              <motion.img
                src={assets.pickuptruck_icon}
                alt="Pickuptruck Icon"
                className="w-8 min-w-5 cursor-pointer"
                animate={{ opacity: 0.8 }} // Animate opacity for cart icon
                transition={{ duration: 0.5 }} // Animation duration
              />
              {/* Display cart count */}
              <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                {getCartCount()} {/* Show the count of items in the cart */}
              </p>
            </Link>

            {/* Mobile menu toggle button */}
            <div
              onClick={toggleMenu} // Trigger mobile menu toggle
              className={`menu-toggle ${menuActive ? "active" : ""} w-8 h-8 cursor-pointer flex flex-col justify-around items-center transition-transform duration-500 sm:hidden`}
            >
              <img src={assets.menu_icon} alt="menu icon" />
            </div>
          </div>
        </div>

        {/* Mobile menu sidebar with animation */}
        <AnimatePresence>
          {visible && (
            <motion.div
              className="fixed top-0 right-0 bg-[#ebe6d7] w-full h-full z-50 sm:hidden"
              variants={sidebarVariants} // Animation variants for sidebar
              initial="hidden" // Initial state is hidden
              animate="visible" // Animate to visible state
              exit="exit" // Exit animation
            >
              <div className="flex flex-col text-gray-600 p-6">
                {/* Close button */}
                <div
                  onClick={() => {
                    setVisible(false); // Hide mobile menu
                    setMenuActive(false); // Reset menu active state
                    document.body.style.overflow = "auto"; // Re-enable body scroll
                  }}
                  className="flex items-center gap-4 p-3 pt-3 cursor-pointer"
                >
                  <img src={assets.backarrow_icon} alt="Back Arrow Icon" className="w-5" />
                  <p>Back</p>
                </div>

                {/* Mobile navigation links */}
                {["HOME", "MATERIALS", "ABOUT", "CONTACT"].map((text, index) => (
                  <NavLink
                    key={index}
                    to={text.toLowerCase() === "home" ? "/" : `/${text.toLowerCase()}`} // Determine the correct path
                    className="p-3 border-b border-[#d1c7a3] hover:bg-[#ebe6d7] transition-transform duration-500 transform"
                    style={{ transitionDelay: `${100 * (index + 1)}ms` }} // Staggered animation delay
                    onClick={() => {
                      setVisible(false); // Hide menu when a link is clicked
                      setMenuActive(false); // Reset menu state
                      document.body.style.overflow = "auto"; // Re-enable scroll
                    }}
                  >
                    {text} {/* Render text for each link */}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Navbar;
