import { useNavigate } from "react-router-dom";


const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  }

  return (
    <div className='flex justify-center items-center flex-col min-h-screen p-4 sm:p-8 md:p-10 lg:p-12'>
      <h1 className='text-5xl sm:text-6xl md:text-7xl leading-tight sm:leading-[6rem] md:leading-[7rem] text-center'>404 - Page Not Found</h1>
      <p className='text-lg sm:text-xl md:text-2xl text-center'>Sorry, the page you are looking for does not exist.</p>
      <button
         onClick={handleGoHome} // Call the handleGoHome function when the button is clicked
         className='mt-6 bg-[#d1c7a3] text-black rounded-md py-2 px-4 hover:bg-[#bfb292] transition-all duration-200'
      >
        Go Back Home
      </button>
    </div>
  );
}

export default NotFound;
