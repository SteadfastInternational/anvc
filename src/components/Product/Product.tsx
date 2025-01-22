'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductType } from '@/type/ProductType';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from '@/context/CartContext';
import { useModalCartContext } from '@/context/ModalCartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useModalWishlistContext } from '@/context/ModalWishlistContext';
import { useCompare } from '@/context/CompareContext';
import { useModalCompareContext } from '@/context/ModalCompareContext';
import { useModalQuickviewContext } from '@/context/ModalQuickviewContext';
import { useRouter } from 'next/navigation';
import Marquee from 'react-fast-marquee';
import Rate from '../Other/Rate';

interface ProductProps {
    data: ProductType;
    type: string;
}

const Product: React.FC<ProductProps> = ({ data, type }) => {
    const [activeColor, setActiveColor] = useState<string>(data.variation[0]?.colorCode || ''); // Default to the first color
    const [currentPrice, setCurrentPrice] = useState<number>(data.price); // Default price
    const [openQuickShop, setOpenQuickShop] = useState<boolean>(false);
    const { addToCart, updateCart, cartState } = useCart();
    const { openModalCart } = useModalCartContext();
    const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
    const { openModalWishlist } = useModalWishlistContext();
    const { addToCompare, removeFromCompare, compareState } = useCompare();
    const { openModalCompare } = useModalCompareContext();
    const { openQuickview } = useModalQuickviewContext();
    const router = useRouter();

    const handleColorSelect = (colorCode: string) => {
        setActiveColor(colorCode);

        // Find the selected color's price and update it
        const selectedVariation = data.variation.find(
            (variation) => variation.colorCode === colorCode
        );

        if (selectedVariation) {
            setCurrentPrice(selectedVariation.price); // Update the price based on color variation
        } else {
            setCurrentPrice(data.price); // Fallback to default price if no variation is found
        }
    };

    const handleAddToCart = () => {
        if (!cartState.cartArray.find(item => item.id === data.id && item.selectedColor === activeColor)) {
            // Add to cart with the current price
            addToCart(data, activeColor, activeColor, currentPrice); 
        }
        updateCart(data.id, data.quantityPurchase, activeColor, currentPrice); // Update the cart with the selected color and quantity
        openModalCart();
    };
    

    const handleAddToWishlist = () => {
        if (wishlistState.wishlistArray.some(item => item.id === data.id)) {
            removeFromWishlist(data.id);
        } else {
            addToWishlist(data);
        }
        openModalWishlist();
    };

    const handleAddToCompare = () => {
        if (compareState.compareArray.length < 3) {
            if (compareState.compareArray.some(item => item.id === data.id)) {
                removeFromCompare(data.id);
            } else {
                addToCompare(data);
            }
        } else {
            alert('Compare up to 3 products');
        }
        openModalCompare();
    };

    const handleQuickviewOpen = () => {
        openQuickview(data);
    };

    const handleDetailProduct = (productId: string) => {
        router.push(`/product/default?id=${productId}`);
    };

    return (
        <>
            {type === "grid" ? (
                <div className="product-item grid-type">
                    <div onClick={() => handleDetailProduct(data.id)} className="product-main cursor-pointer block">
                        <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">
                            {data.new && (
                                <div className="product-tag text-button-uppercase bg-green px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-[1]">
                                    New
                                </div>
                            )}
                            {data.sale && (
                                <div className="product-tag text-button-uppercase text-white bg-red px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z -[1]">
                                    Sale
                                </div>
                            )}
                            <div className="list-action-right absolute top-3 right-3 max-lg:hidden">
                                <div
                                    className={`add-wishlist-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative ${wishlistState.wishlistArray.some(item => item.id === data.id) ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToWishlist();
                                    }}
                                >
                                    <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Add To Wishlist</div>
                                    {wishlistState.wishlistArray.some(item => item.id === data.id) ? (
                                        <Icon.Heart size={18} weight='fill' className='text-white' />
                                    ) : (
                                        <Icon.Heart size={18} />
                                    )}
                                </div>
                                <div
                                    className={`compare-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative mt-2 ${compareState.compareArray.some(item => item.id === data.id) ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCompare();
                                    }}
                                >
                                    <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Compare Product</div>
                                    <Icon.Repeat size={18} className='compare-icon' />
                                    <Icon.CheckCircle size={20} className='checked-icon' />
                                </div>
                            </div>
                            <div className="product-img w-full h-full aspect-[3/4]">
                                {data.thumbImage.map((img, index) => (
                                    <Image
                                        key={index}
                                        src={img}
                                        width={500}
                                        height={500}
                                        priority={true}
                                        alt={data.name}
                                        className="w-full h-full object-cover duration-700"
                                    />
                                ))}
                            </div>

                            <div className="list-action grid grid-cols-2 gap-3 px-5 absolute w-full bottom-5 max-lg:hidden">
                                <div
                                    className="quick-view-btn w-full text-button-uppercase py-2 text-center rounded-full duration-300 bg-white hover:bg-black hover:text-white"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleQuickviewOpen();
                                    }}
                                >
                                    Quick View
                                </div>
                                {data.action === 'add to cart' ? (
                                    <div
                                        className="add-cart-btn w-full text-button-uppercase py-2 text-center rounded-full duration-500 bg-white hover:bg-black hover:text-white"
                                        onClick={e => {
                                            e.stopPropagation();
                                            handleAddToCart();
                                        }}
                                    >
                                        Add To Cart
                                    </div>
                                ) : (
                                    <>
                                        <div
                                            className="quick-shop-btn text-button-uppercase py-2 text-center rounded-full duration-500 bg-white hover:bg-black hover:text-white"
                                            onClick={e => {
                                                e.stopPropagation();
                                                setOpenQuickShop(!openQuickShop);
                                            }}
                                        >
                                            Quick Shop
                                        </div>
                                        <div
                                            className={`quick-shop-block absolute left-5 right-5 bg-white p-5 rounded-[20px] ${openQuickShop ? 'open' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            {/* Color Selection */}
                                            <div className="list-color flex items-center justify-center flex-wrap gap-2">
  {data.variation.map((variation, index) => (
    <div
      key={index}
      className={`color-item w-10 h-10 rounded-full cursor-pointer border-2 flex items-center justify-center ${
        activeColor === variation.colorCode ? 'border-black' : 'border-transparent'
      }`}
      style={{
        backgroundColor: variation.colorCode,
        color: '#000', // Black text
      }}
      onClick={() => handleColorSelect(variation.colorCode)}
    >
      <span className="text-sm font-semi-bold">{variation.colorCode}</span>
    </div>
  ))}
</div>


                                            {/* Display Current Price */}
                                            <div className="current-price text-center mt-2">
                                                <span className="text-title">₦{currentPrice}.00</span>
                                            </div>

                                            {/* Add To Cart Button */}
                                            <div
                                                className="button-main w-full text-center rounded-full py-3 mt-4"
                                                onClick={() => {
                                                    handleAddToCart();
                                                    setOpenQuickShop(false);
                                                }}
                                            >
                                                Add To Cart
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="list-action-icon flex items-center justify-center gap -2 absolute w-full bottom-3 z-[1] lg:hidden">
                                <div
                                    className="quick-view-btn w-9 h-9 flex items-center justify-center rounded-lg duration-300 bg-white hover:bg-black hover:text-white"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleQuickviewOpen();
                                    }}
                                >
                                    <Icon.Eye className='text-lg' />
                                </div>
                                <div
                                    className="add-cart-btn w-9 h-9 flex items-center justify-center rounded-lg duration-300 bg-white hover:bg-black hover:text-white"
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleAddToCart();
                                    }}
                                >
                                    <Icon.ShoppingBagOpen className='text-lg' />
                                </div>
                            </div>
                        </div>
                        <div className="product-infor mt-4 lg:mb-7">
                            <div className="product-sold sm:pb-4 pb-2">
                                <div className="progress bg-line h-1.5 w-full rounded-full overflow-hidden relative">
                                    <div className={`progress-sold bg-red absolute left-0 top-0 h-full`} />
                                </div>
                                <div className="flex items-center justify-between gap-3 gap-y-1 flex-wrap mt-2">
                                    <div className="text-button-uppercase" />
                                    <div className="text-button-uppercase">
                                        <span className='text-secondary2 max-sm:text-xs'>Available: </span>
                                        <span className='max-sm:text-xs'>{data.quantity}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="product-name text-title duration-300">{data.name}</div>
                            <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
                                <div className="product-price text-title">₦{currentPrice}.00</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Handle other types if necessary
                <></>
        )}
    
            {type === 'marketplace' ? (
                <div className="product-item style-marketplace p-4 border border-line rounded-2xl" onClick={() => handleDetailProduct(data.id)}>
                    <div className="bg-img relative w-full">
                        <Image className='w-full aspect-square' width={5000} height={5000} src={data.thumbImage[0]} alt="img" />
                        <div className="list-action flex flex-col gap-1 absolute top-0 right-0">
                            <span
                                className={`add-wishlist-btn w-8 h-8 bg-white flex items-center justify-center rounded-full box-shadow-sm duration-300 ${wishlistState.wishlistArray.some(item => item.id === data.id) ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleAddToWishlist()
                                }}
                            >
                                {wishlistState.wishlistArray.some(item => item.id === data.id) ? (
                                    <>
                                        <Icon.Heart size={18} weight='fill' className='text-white' />
                                    </>
                                ) : (
                                    <>
                                        <Icon.Heart size={18} />
                                    </>
                                )}
                            </span>
                            <span
                                className={`compare-btn w-8 h-8 bg-white flex items-center justify-center rounded-full box-shadow-sm duration-300 ${compareState.compareArray.some(item => item.id === data.id) ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleAddToCompare()
                                }}
                            >
                                <Icon.Repeat size={18} className='compare-icon' />
                                <Icon.CheckCircle size={20} className='checked-icon' />
                            </span>
                            <span
                                className="quick-view-btn w-8 h-8 bg-white flex items-center justify-center rounded-full box-shadow-sm duration-300"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleQuickviewOpen()
                                }}
                            >
                                <Icon.Eye />
                            </span>
                            <span
                                className="add-cart-btn w-8 h-8 bg-white flex items-center justify-center rounded-full box-shadow-sm duration-300"
                                onClick={e => {
                                    e.stopPropagation();
                                    handleAddToCart()
                                }}
                            >
                                <Icon.ShoppingBagOpen />
                            </span>
                        </div>
                    </div>
                    <div className="product-infor mt-4">
                        <span className="text-title">{data.name}</span>
                        <div className="flex gap-0.5 mt-1">
                            <Rate currentRate={data.rate} size={16} />
                        </div>
                        <span className="text-title inline-block mt-1">₦{data.price}.00</span>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default Product