'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuMarketplace from '@/components/Header/Menu/MenuMarketplace';
import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb1';
import Footer from '@/components/Footer/Footer';
import { ProductType } from '@/type/ProductType'; // Import ProductType

export default function DefaultGrid() {
    const searchParams = useSearchParams();
    const [productData, setProductData] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const type = searchParams.get('type');
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Get the base API URL from environment variables
                if (!apiUrl) {
                    throw new Error('API URL is not defined in the environment variables.');
                }

                // Fetch products based on type and category
                const response = await fetch(`${apiUrl}/products?type=${type}&category=${category}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProductData(data); // Assuming the data is an array of products
            } catch (err) {
                const errorMessage = (err as Error).message || 'An unknown error occurred';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        if (type && category) {
            fetchProducts();
        }
    }, [type, category]); // Fetch data whenever type or category changes

    if (loading) {
        return <div>Loading...</div>; // You can customize this loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Handle error state
    }

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="ENJOY FREE SHIPPING ON ORDERS OVER ₦100,000" />
            <div id="header" className='relative w-full'>
                <MenuMarketplace SubMenuDepartment={false} />
            </div>
            <ShopBreadCrumb1 productPerPage={9} dataType={type} category={category} />
            <Footer />
        </>
    );
}