'use client';

import React, { useState, useEffect } from 'react';
import Product from '../Product/Product';

// Define the Variation interface
export interface Variation {
    color: string;
    colorCode: string;
    price: number; // Price specific to the color variation
}

// Define the ProductType interface
export interface ProductType {
    id: string;
    category: string;
    type: string;
    name: string;
    tag: string;
    new: boolean;
    sale: boolean;
    rate: number;
    price: number; // Default price (before color selection)
    watt: number;
    weight: number;
    bodyColor: string;
    availableQuantity: number;
    quantity: number;
    quantityPurchase: number;
    variation: Variation[]; // Array of color variations, each with a price
    thumbImage: string[];
    images: string[];
    description: string;
    action: string;
    slug: string;
    activeColor: string; // The currently displayed color variation
    selectedColor: string; // The color selected by the user
}

const Deal = () => {
    const initialTime = (3 * 24 * 60 * 60) + (15 * 60 * 60); // 3 days and 15 hours in seconds
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [productData, setProductData] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : initialTime));
        }, 1000);

        return () => clearInterval(timer);
    }, [initialTime]);

    // Fetch product data effect
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Ensure the API URL is defined
                if (!apiUrl) {
                    throw new Error('API URL is not defined in the environment variables.');
                }

                const response = await fetch(`${apiUrl}/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product data.');
                }
                const data = (await response.json()) as ProductType[];
                setProductData(data);
            } catch (err) {
                const errorMessage = (err as Error).message || 'An unknown error occurred';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Convert timeLeft into days, hours, minutes, and seconds
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (productData.length === 0) {
        return <div>No products available.</div>;
    }

    // Limit the displayed products to the first 10
    const limitedProducts = productData.slice(0, 10);

    return (
        <div className="md:pt-[60px] pt-10">
            <div className="container">
                <div className="heading flex items-center justify-between gap-5 flex-wrap">
                    <div className="left flex items-center gap-6 gap-y-3 flex-wrap">
                        <div className="heading3">Deal of the Week</div>
                        <div className="deal-time bg-red py-1 px-5 rounded-lg">
                            <div className="heading6 text-white">
                                <span className="countdown-day">{days < 10 ? `0${days}` : days}</span>
                                <span>D : </span>
                                <span className="countdown-hour">{hours < 10 ? `0${hours}` : hours}</span>
                                <span>H : </span>
                                <span className="countdown-minute">{minutes < 10 ? `0${minutes}` : minutes}</span>
                                <span>M : </span>
                                <span className="countdown-second">{seconds < 10 ? `0${seconds}` : seconds}</span>
                                <span>S</span>
                            </div>
                        </div>
                    </div>
                    <a
                        href="/shop/breadcrumb-img"
                        className="text-button pb-1 border-b-2 border-black hover:text-red-500 transition"
                    >
                        View All Products
                    </a>
                </div>
                <div className="list grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
                    {limitedProducts.map((product) => (
                        <Product data={product} type="marketplace" key={product.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Deal;
