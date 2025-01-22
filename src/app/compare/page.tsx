'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuMarketplace from '@/components/Header/Menu/MenuMarketplace';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import { ProductType } from '@/type/ProductType';
import { useCompare } from '@/context/CompareContext';
import { useCart } from '@/context/CartContext';
import { useModalCartContext } from '@/context/ModalCartContext';
import Rate from '@/components/Other/Rate';

const Compare = () => {
    const { compareState } = useCompare();
    const { cartState, addToCart, updateCart } = useCart();
    const { openModalCart } = useModalCartContext();

    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Get the API URL from environment variables
                if (!apiUrl) {
                    throw new Error('API URL is not defined in the environment variables.');
                }

                const response = await fetch(`${apiUrl}/products`); // Use the environment variable
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data); // Assuming the data is an array of products
            } catch (err) {
                const errorMessage = (err as Error).message || 'An unknown error occurred';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (productItem: ProductType) => {
        const existingCartItem = cartState.cartArray.find(
            (item) => item.id === productItem.id && item.selectedColor === productItem.selectedColor
        );

        const selectedColor = productItem.selectedColor || '';
        const activeColor = productItem.activeColor || '';
        const price = parseFloat(productItem.price.toFixed(2)); // Ensure price is a number

        if (!existingCartItem) {
            // Add to cart if the item does not exist
            addToCart(productItem, selectedColor, activeColor, price);
        }

        // Update the cart regardless (e.g., updating quantity or price)
        updateCart(
            productItem.id,
            productItem.quantityPurchase || 1, // Default to 1 if quantityPurchase is undefined
            selectedColor, // Ensure selectedColor is passed
            price // Ensure price is passed
        );

        // Open the cart modal
        openModalCart();
    };

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
                <Breadcrumb heading='Compare Products' subHeading='Compare Products' />
            </div>
            <div className="compare-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main">
                        <div>
                            <div className="list-product flex">
                                <div className="left lg:w-[240px] w-[170px] flex-shrink-0"></div>
                                <div className="right flex w-full border border-line rounded-t-2xl border-b-0">
                                    {compareState.compareArray.map(item => (
                                        <div className="product-item px-10 pt-6 pb-5 border-r border-line" key={item.id}>
                                            <div className="bg-img w-full aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={item.images[0]}
                                                    width={1000}
                                                    height={1500}
                                                    alt={item.images[0]}
                                                    className='w-full h-full object-cover'
                                                />
                                            </div>
                                            <div className="text-title text-center mt-4">{item.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="compare-table flex">
                                <div className="left lg:w-[240px] w-[170px] flex-shrink-0 border border-line border-r-0 rounded-l-2xl">
                                    <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">Rating</div>
                                    <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">Price</div>
                                    <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">Category</div>
                                    <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">Weight</div>
                                    <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">Variations</div>
                                    <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">Add To Cart</div>
                                </div>
                                <table className="right border-collapse w-full border-t border-r border-line">
                                    <tr className={`flex w-full items-center`}>
                                        {compareState.compareArray.map((item, index) => (
                                            <td className="w-full border border-line h-[60px] border-t-0 border-r-0" key={index}>
                                                <div className='h-full flex items-center justify-center'>
                                                    <Rate currentRate={item.rate} size={12} />
                                                    <p className='pl-1'>(1.234)</p>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr className={`flex w-full items-center`}>
                                        {compareState.compareArray.map((item, index) => (
                                            <td className="w-full border border-line h-[60px] border-t-0 border-r-0" key={index}>
                                                <div className='h-full flex items-center justify-center'>
                                                ₦{item.price}.00
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr className={`flex w-full items-center`}>
                                        {compareState.compareArray.map((item, index) => (
                                            <td className="w-full border border-line h-[60px] border-t-0 border-r-0" key={index}>
                                                <div className='h-full flex items-center justify-center capitalize'>
                                                    {item.category}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr className={`flex w-full items-center`}>
                                        {compareState.compareArray.map((item, index) => (
                                            <td className="w-full border border-line h-[60px] border-t-0 border-r-0" key={index}>
                                                <div className='h-full flex items-center justify-center capitalize'>
                                                    {item.weight}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr className={`flex w-full items-center`}>
                                        {compareState.compareArray.map((item, index) => (
                                            <td className="w-full border border-line h-[60px] border-t-0 border-r-0 size" key={index}>
                                                <div className='h-full flex items-center justify-center capitalize gap-1'>
                                                    {item.variation.map((variation, i) => (
                                                        <p key={i}>{variation.color}
                                                            <span>,</span>
                                                        </p>
                                                    ))}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                    <tr className={`flex w-full items-center`}>
                                        {compareState.compareArray.map((item, index) => (
                                            <td className="w-full border border-line h-[60px] border-t-0 border-r-0" key={index}>
                                                <div className='h-full flex items-center justify-center'>
                                                    <div className='button-main py-1.5 px-5' onClick={() => handleAddToCart(item)}>Add To Cart</div>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Compare;