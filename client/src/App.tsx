import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Material from './pages/Material';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';



const App = () => {
  const location = useLocation();

  const showNavbar = ['/', '/materials', '/about', '/contact','/products/:productId'].some(route => 
    location.pathname.startsWith(route)
  ) || /^\/products\/.+$/.test(location.pathname);

  const showFooter = ['/', '/materials', '/about', '/contact','/products/:productId'].some((route) =>
    location.pathname.startsWith(route)
  ) || /^\/products\/.+$/.test(location.pathname); // Include dynamic product routes


  return (
    <div>
      {/* Conditionally render Navbar */}
      {showNavbar && <Navbar />}
      <SearchBar />

      {/* Home Page without layout constraints */}
      {location.pathname === '/' ? (
        <>
          {/* Render the Home page without layout constraints */}
          <Home />
        </>
      ) : (
        // Other pages with layout constraints
        <div className="px-4 sm:px-10 md:px-10 max-w-[1720px] mx-auto bg-[#ebe6d7] text-gray-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/materials" element={<Material />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}
      
      {/* Conditionally render Footer */}
      {showFooter && <Footer />}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default App;
