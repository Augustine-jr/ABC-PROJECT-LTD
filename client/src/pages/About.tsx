import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      {/* Your About page content will go here >*/}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.placeholder_icon}  alt=""/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
         <p>
            At ABC Project Limited, we are committed to providing premium building materials, including high-quality woods, durable plywood, sturdy nails, and reliable leather products. Our materials are sourced from trusted suppliers to ensure lasting performance in every project.
          </p>
          <p>
            Whether you're working on a large construction site or a home improvement project, our range of products meets the highest standards in the industry. We believe in delivering excellence through every piece of wood, sheet of plywood, and pack of nails we supply.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission is to be the leading supplier of building materials by offering exceptional products and unparalleled customer service. We aim to support builders and craftsmen by providing materials that stand the test of time, ensuring safety, durability, and aesthetic appeal for every construction endeavor.
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
         <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border border-[#d1c7a3] px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
  <b>Superior Material Quality:</b>
  <p className='text-gray-600'>
    At ABC PROJECT LTD, we provide top-grade woods, premium plywood, durable nails, and quality leather products. Our materials are sourced from trusted suppliers and undergo strict quality checks to ensure long-lasting performance for every project.
  </p>
</div>

<div className='border border-[#d1c7a3] px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
  <b>Effortless Procurement:</b>
  <p className='text-gray-600'>
    From placing an order to receiving your supplies, we make material sourcing stress-free. Our streamlined process ensures fast deliveries, accurate order fulfillment, and hassle-free pickups, keeping your projects on track.
  </p>
</div>

<div className='border border-[#d1c7a3] px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
  <b>Dedicated Customer Support:</b>
  <p className='text-gray-600'>
    Our experienced team is committed to supporting your construction needs. We provide expert guidance, personalized recommendations, and prompt assistance, ensuring you get the right materials for every job, big or small.
  </p>
</div>

      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About