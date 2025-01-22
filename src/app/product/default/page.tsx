'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuMarketplace from '@/components/Header/Menu/MenuMarketplace';
import BreadcrumbProduct from '@/components/Breadcrumb/BreadcrumbProduct';
import Default from '@/components/Product/Detail/Default';
import Footer from '@/components/Footer/Footer';
import { ProductType } from '@/type/ProductType';

const ProductDefault = () => {
  const [products, setProducts] = useState<ProductType[]>([]); // State now stores an array
  const searchParams = useSearchParams();
  const productId = searchParams.get('id') || '1'; 

  useEffect(() => {
    // Fetch product by ID
    const fetchProduct = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL ; // Use env variable
        const response = await fetch(`${apiUrl}/products/${productId}`); // Dynamically use API URL
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data: ProductType = await response.json();
        setProducts([data]); // Wrap the single product into an array
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (products.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <TopNavOne props="style-one bg-black" slogan="ENJOY FREE SHIPPING ON ORDERS OVER ₦100,000" />
      <div id="header" className="relative w-full">
        <MenuMarketplace SubMenuDepartment={false} />
        <BreadcrumbProduct data={products} productPage="default" productId={productId} />
      </div>
      <Default data={products} productId={productId} /> {/* Pass the productId prop */}
      <Footer />
    </>
  );
};

export default ProductDefault;
