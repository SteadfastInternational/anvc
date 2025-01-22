'use client';

import React, { useState, useEffect } from 'react';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuMarketplace from '@/components/Header/Menu/MenuMarketplace';
import SliderMarketplace from '@/components/Slider/SliderMarketplace';
import BannerAbove from '@/components/Marketplace/BannerAbove';
import Benefit from '@/components/Home1/Benefit';
import Footer from '@/components/Footer/Footer';
import ModalNewsletter from '@/components/Modal/ModalNewsletter';
import Deal from '@/components/Marketplace/Deal';
import Collection from '@/components/Marketplace/Collection';
import BestSeller from '@/components/Marketplace/BestSeller';
import BannerBelow from '@/components/Marketplace/BannerBelow';
import Recommend from '@/components/Marketplace/Recommend';
import axios from 'axios';
import { ProductType } from '@/type/ProductType';

export default function HomeMarketplace() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { 
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Use the environment variable for API base URL
     

        if (!apiUrl) {
          setError('API URL is not defined in the environment variables.'); // Set error state instead of throwing
          return; // Exit the function early
        }

        const response = await axios.get(`${apiUrl}/products`);
        const fetchedProducts: ProductType[] = response.data.map((item: any) => ({
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
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch product data');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <>
      <TopNavOne props="style-marketplace bg-[#263587] border-b border-surface1" slogan="ENJOY FREE SHIPPING ON ORDERS OVER ₦100,000" />
      <div id="header" className="relative w-full">
        <MenuMarketplace SubMenuDepartment={true} />
        <SliderMarketplace />
      </div>
      <BannerAbove />
      <Deal />
      <Collection />
      <BestSeller/>
      <BannerBelow />
      <Recommend />
      <Benefit props="md:py-[60px] py-10 border-b border-line" />
      <Footer />
      <ModalNewsletter />
    </>
  );
}