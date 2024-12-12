import React from 'react'
import { assets } from '../assets/assets'

// Define an interface for the props of PolicyItem component
// This helps TypeScript understand the expected shape of the props
interface PolicyItemProps {
  icon: string;    // URL or path to the icon image
  title: string;   // Title of the policy item
  description: string;  // Description of the policy item
}

// PolicyItem component with typed props
// Using the interface to provide type information for destructured props
const PolicyItem = ({ icon, title, description }: PolicyItemProps) => (
  <div>
    <img src={icon} className='w-12 m-auto mb-5' alt={`${title} Icon`} />
    <p className='font-semibold'>{title}</p>
    <p className='text-gray-400'>{description}</p>
  </div>
);

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-10 md:py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      {/* Render each policy using the PolicyItem component */}
      <PolicyItem 
        icon={assets.bulkorders_icon} 
        title="Bulk Orders Available" 
        description="Need large quantities? We offer special rates and fast delivery for bulk orders of wood, nails, and more." 
      />

      <PolicyItem 
        icon={assets.customcut_icon} 
        title="Custom Cut Wood" 
        description="We offer wood cutting services to fit your specific project requirements, ensuring precise dimensions and less waste." 
      />

      <PolicyItem 
        icon={assets.customersupport_icon} 
        title="24/7 Customer Assistance" 
        description="We're here around the clock to help with any questions or concerns about your orders and materials." 
      />

    </div>
  );
};


export default OurPolicy
