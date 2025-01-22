'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ProductType } from '@/type/ProductType';
import { motion } from 'framer-motion';
import Product from '../Product/Product';

const BestSeller: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('chandelier-with-fan');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Use the environment variable for API base URL
        if (!apiUrl) {
          throw new Error('API URL is not defined in the environment variables.');
        }

        const response = await fetch(`${apiUrl}/products?limit=10`); // Adjust the endpoint as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const transformedData: ProductType[] = data.map((item: any) => ({
          id: item.id || '',
          category: item.category || '',
          type: item.type || '',
          name: item.name || '',
          tag: item.tag || '',
          new: item.new || false,
          sale: item.sale || false,
          rate: item.rate || 0,
          price: item.price || 0,
          watt: item.watt || 0,
          weight: item.weight || 0,
          bodyColor: item.bodyColor || '',
          availableQuantity: item.availableQuantity || 0,
          quantity: item.quantity || 0,
          quantityPurchase: item.quantityPurchase || 0,
          variation: item.variation || [],
          thumbImage: item.thumbImage || [],
          images: item.images || [],
          description: item.description || '',
          action: item.action || '',
          slug: item.slug || '',
          activeColor: item.activeColor || '',
          selectedColor: item.selectedColor || '',
        }));

        setProducts(transformedData);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError((err as Error).message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => [...new Set(products.map(product => product.category))], [products]);

  const filteredProducts = useMemo(
    () => products.filter((product) => product.category === activeTab),
    [products, activeTab]
  );

  const startIndex = 0; // Starting index for displaying products
  const limit = 10; // Limit for displaying products
  const endIndex = startIndex + limit; // Calculate the end index

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="tab-features-block style-marketplace md:pt-[60px] pt-10">
      <div className="container">
        <div className="heading flex items-center justify-between gap-5 flex-wrap w-full">
          <div className="heading3">Best Sellers</div>
          <div className="menu-tab flex items-center bg-surface rounded-2xl gap-2 p-1">
            {categories.map((type) => (
              <div
                key={type}
                className={`tab-item relative text-secondary text-button-uppercase py-2 px-5 cursor-pointer duration-500 hover:text-black ${
                  activeTab === type ? 'active' : ''
                }`}
                onClick={() => setActiveTab(type)}
              >
                {activeTab === type && (
                  <motion.div layoutId="active-pill" className="absolute inset-0 rounded-2xl bg-white"></motion.div>
                )}
                <span className="relative text-button-uppercase z-[1]">{type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="list-product grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-[30px] gap-5 relative section-swiper-navigation style-outline style-small-border md:mt-10 mt-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.slice(startIndex, endIndex).map((prd) => (
              <Product data={prd} type="marketplace" key={prd.id} />
            ))
          ) : (
            <div>No products available for this category.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;