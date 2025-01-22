'use client'

import React, { useState, useEffect } from 'react';
import { ProductType } from '@/type/ProductType'; // Import the ProductType interface
import Product from '../Product/Product';

const Recommend = () => {
    const [productData, setProductData] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Get the base API URL from environment variables
                if (!apiUrl) {
                    throw new Error('API URL is not defined in the environment variables.');
                }

                // Fetch products from the API
                const response = await fetch(`${apiUrl}/products`); // Adjust the endpoint as needed
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json(); // Get the raw data
               

                // Check if the data is an array
                if (Array.isArray(data)) {
                    setProductData(data); // Set productData if it's an array
                } else {
                    throw new Error('Fetched data is not an array');
                }
            } catch (err) {
                const errorMessage = (err as Error).message || 'An unknown error occurred';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Fetch data when the component mounts

    if (loading) {
        return <div>Loading...</div>; // You can customize this loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Handle error state
    }

    // Display a subset of the fetched products
    const recommendedProducts = productData.slice(5, 10); // Adjust the slice as needed

    return (
        <div className="recommend md:mt-[60px] mt-10">
            <div className="container">
                <div className="heading flex items-center justify-between gap-5 flex-wrap">
                    <div className="heading3">Recommended For You</div>
                    <a href='/shop/breadcrumb-img.html' className='text-button pb-0.5 border-b-2 border-black'>View All</a>
                </div>
                <div className="list grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
                    {recommendedProducts.map(item => (
                        <Product data={item} type='marketplace' key={item.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Recommend;