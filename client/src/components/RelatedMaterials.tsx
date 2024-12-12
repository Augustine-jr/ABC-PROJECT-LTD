import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  _id: string;
  image: string[];
  name: string;
  price: number;
  oldPrice?: number;
  discount: number;
  rating?: number;
}

interface RelatedMaterialsProps {
  currentProductId: string;
  products: Product[];
  currency?: string;
}

const RelatedMaterials: React.FC<RelatedMaterialsProps> = ({ 
  currentProductId, 
  products,
  currency = '$' 
}) => {
  const navigate = useNavigate();

  // Filter and get 4 related products, excluding current product
  const getRelatedProducts = () => {
    return products
      .filter(product => product._id !== currentProductId)
      .slice(0, 4);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  const relatedProducts = getRelatedProducts();

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-20 mb-16">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-medium">Related Materials</h2>
        <button
          className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          onClick={() => navigate('/shop')}
        >
          View All
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div
            key={product._id}
            className="group cursor-pointer border rounded-lg p-4 hover:shadow-lg transition-shadow"
            onClick={() => handleProductClick(product._id)}
          >
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <h3 className="font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-center gap-2">
                <p className="font-medium">{currency}{product.price}</p>
                {product.oldPrice && (
                  <p className="text-sm text-gray-500 line-through">
                    {currency}{product.oldPrice}
                  </p>
                )}
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"/>
                  In Stock
                </div>
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <span>★</span>
                    {product.rating}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Add Button - Appears on Hover */}
            <button
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                // Add to cart logic here
              }}
            >
              Quick Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedMaterials;