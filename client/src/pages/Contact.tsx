import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import Title from '../components/Title'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-8 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.placeholder_icon}  alt=""/>
        <div className='flex flex-col justify-center items-start gap-6'>
           <p className='font-semibold text-x1 text-gray-600'>Our Store</p>
           <p className='text-gray-500'>Shop A 116, <br/> Dei-Dei Timber Shed, Abuja</p>
           <p className='text-gray-500'>Tel: 09077579138 <br/> 08036022171 <br/> abcprojectltd@gmail.com</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default Contact