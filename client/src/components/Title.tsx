import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TitleProps { 
  text1: string; 
  text2: string; 
} 

const Title: React.FC<TitleProps> = ({ text1, text2 }) => { 
  return ( 
    <div className='inline-flex gap-2 items-center mb-3'> 
      <p className='font-semibold text-gray-700'>{text1}</p> 
      <p className='font-semibold text-gray-700'>{text2}</p>
      <ArrowRight className='text-gray-700 w-5 h-5' /> 
    </div> 
  ); 
} 

export default Title;