import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Product as ProductType, Review } from '../types';
import StarRating from '../components/StarRating'; 
import RelatedMaterials from '../components/RelatedMaterials';

// I will add pagination for reviews
// and by default the star icons are supposed to be gray then yellow when the user clicks it i will implement that too

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });

  // Optimized fetch function
  const fetchProductData = () => {
    const product = products.find(item => item._id === productId);
    if (product?.image && product.image.length > 0) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  // Function to handle adding a new review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: Date.now().toString(),
      userName: 'Anonymous', // Replace with actual user name from auth
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString()
    };
    setReviews([...reviews, review]);
    setNewReview({ rating: 5, comment: '' });
  };

  // Star rating component
  

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex flex-col lg:flex-row gap-12'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto max-h-[500px] justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image?.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                alt={`${productData.name} view ${index + 1}`}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer 
                  ${image === item ? 'border-2 border-[#d1c7a3]' : ''}`}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img 
              src={image || ''} 
              alt={productData.name} 
              className='w-full h-auto object-cover'
            />
          </div>
        </div>

        {/* Product Details */}
        <div className='flex-1'>
          <h1 className='text-2xl font-medium mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-2 mt-2'>
            <StarRating rating={4} />
            <p className='text-sm text-gray-500'>({reviews.length} reviews)</p>
          </div>
          
          
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"/>
                  In Stock
                </div>
          
          {/* Size Selection */}
          <div className='flex flex-col gap-4 my-8'>
            <p className='font-medium'>Select Size</p>
            <div className='flex flex-wrap gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`px-4 py-2 border transition-all
                    ${item === size 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={() => addToCart(productData._id, size || '')}
            className='w-full sm:w-auto bg-[#645832] hover:bg-[#d1c7a3] text-white px-8 py-3 rounded-lg transition-colors'
          >
            Add to Truck
          </button>

          {/* Product Policies */}
          <div className="h-px bg-gradient-to-r from-[#d1c7a3] to-[#645832] mt-8" />
          <div className='text-sm text-gray-500 mt-5 space-y-2'>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#645832] rounded-full" />
              Premium Grade Building Materials
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#645832] rounded-full" />
              Certified for construction use
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#645832] rounded-full" />
              Bulk orders available
            </p>
          </div>
        </div>
      </div>

      {/* Description and Review Section */}
      <div className='mt-20'>
        <div className='flex border-b'>
          <button 
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 text-sm font-medium transition-colors
              ${activeTab === 'description' 
                ? 'border-b-2 border-[#645832] text-[#645832]' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 text-sm font-medium transition-colors
              ${activeTab === 'reviews' 
                ? 'border-b-2 border-[#645832] text-[#645832]' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className='mt-6'>
          {activeTab === 'description' ? (
            <div className='prose max-w-none'>
              <p className='text-gray-600 leading-relaxed'>
                {productData.description}
                {/* Add more detailed description here */}
              </p>
            </div>
          ) : (
            <div className='space-y-8'>
              {/* Review Form */}
              <form onSubmit={handleAddReview} className='border rounded-lg p-4 space-y-4'>
                <h3 className='font-medium'>Write a Review</h3>
                <div className='space-y-2'>
                  <label className='block text-sm text-gray-600'>Rating</label>
                  <div className='flex gap-2'>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        type="button"
                        key={rating}
                        onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                        className={`p-1 ${
                          newReview.rating >= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm text-gray-600'>Comment</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    className='w-full border rounded-lg p-2 bg-inherit border-[#d1c7a3]'
                    rows={4}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className='bg-[#645832] hover:bg-[#d1c7a3] text-white px-4 py-2 rounded-lg transition-colors'
                >
                  Submit Review
                </button>
              </form>

              {/* Reviews List */}
              <div className='space-y-6'>
                {reviews.map((review) => (
                  <div key={review.id} className='border-b pb-6'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <p className='font-medium'>{review.userName}</p>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className='text-sm text-gray-500'>{review.date}</p>
                    </div>
                    <p className='mt-2 text-gray-600'>{review.comment}</p>
                  </div>
                ))}
                
                {reviews.length === 0 && (
                  <p className='text-center text-gray-500'>No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Add this before the closing div of your Product component */}
<RelatedMaterials 
  currentProductId={productId || ''}
  products={products.map(product => ({
    ...product,
    image: product.image || []
  }))}
/>
    </div>
  );
};

export default Product;