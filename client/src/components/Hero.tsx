import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation'; // Optional: for navigation buttons/arrows
import 'swiper/css/pagination'; // Optional: for pagination dots
import { Navigation, Autoplay } from 'swiper/modules'; // Correctly import the modules
import { assets } from '../assets/assets'
import { ArrowRight, ArrowLeft } from 'lucide-react';


const Hero = () => {

  //Aray of images for the hero slider
  const heroImages = [
    assets.hero_image,
    assets.hero_image2,
    "https://res.cloudinary.com/deae6smmh/image/upload/v1732116945/hero_image3_yjdq0t.webp",
    assets.hero_image4,
    assets.hero_image5,
    assets.hero_image6,
  ];


  return (
    <div className='flex flex-col sm:flex-row border border-[#d1c7a3]'>
      {/* Hero left side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <ArrowLeft className='text-gray-700 w-5 h-5' /> 
            <p className='font-medium text-xs md:text-sm lg:text-base'>NAIL IT WITH OUR BESTSELLERS.</p>
          </div>
          <h1 className='text-xl sm:text-3xl lg:text-4xl leading-relaxed font-semibold'>Timber For Every Project</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-xs md:text-sm lg:text-base'>SHOP THE TOOLS YOU NEED</p>
            <ArrowRight className='text-gray-700 w-5 h-5' /> 
          </div>
        </div>
      </div>
      {/* Hero Image Carousel */}
       <div className='w-full sm:w-1/2  group'>
         <Swiper
         modules={[Navigation, Autoplay]}
         spaceBetween={10}
         slidesPerView={1}
         navigation={true} //Enable navigation arrows
         pagination={{ clickable: true }} //Enable pagination dots
         autoplay={{ delay: 3000, disableOnInteraction: false }} //Enable autoplay with 3 seconds delay
         loop={true} // Infinite loop
         >
          {heroImages.map((image, index) => (
            <SwiperSlide key={index}>
               <img
                src={image}
                alt={`Hero Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
         </Swiper>

      
      </div>
     </div>

  )
}

export default Hero