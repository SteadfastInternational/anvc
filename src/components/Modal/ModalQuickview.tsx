'use client'

// Quickview.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from '@/type/ProductType';
import { useModalQuickviewContext } from '@/context/ModalQuickviewContext';
import { useCart } from '@/context/CartContext';
import { useModalCartContext } from '@/context/ModalCartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useModalWishlistContext } from '@/context/ModalWishlistContext';
import { useCompare } from '@/context/CompareContext';
import { useModalCompareContext } from '@/context/ModalCompareContext';
import Rate from '../Other/Rate';
import ColorDropdown from './../Product/Detail/ColorDropdown'; // Adjust the import path as necessary

const ModalQuickview = () => {
    const { selectedProduct, closeQuickview } = useModalQuickviewContext();
    const [activeColor, setActiveColor] = useState<string>(selectedProduct?.variation[0]?.colorCode || '');
    const { addToCart, updateCart, cartState } = useCart();
    const { openModalCart } = useModalCartContext();
    const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
    const { openModalWishlist } = useModalWishlistContext();
    const { addToCompare, removeFromCompare, compareState } = useCompare();
    const { openModalCompare } = useModalCompareContext();

    // Function to handle color selection
    const handleColorSelect = (colorCode: string) => {
        setActiveColor(colorCode);
    };

    // Function to get the current price based on the selected color
    const getCurrentPrice = () => {
        if (!selectedProduct || !selectedProduct.variation || selectedProduct.variation.length === 0) {
            return selectedProduct ? selectedProduct.price : 0; // Return default price or 0 if no product
        }

        const selectedVariation = selectedProduct.variation.find(variation => variation.colorCode === activeColor);
        return selectedVariation ? selectedVariation.price : selectedProduct.price;
    };

    const handleIncreaseQuantity = () => {
        if (selectedProduct) {
            selectedProduct.quantityPurchase += 1;
            const currentPrice = getCurrentPrice(); // Get the current price
            updateCart(selectedProduct.id, selectedProduct.quantityPurchase, activeColor, currentPrice);
        }
    };
    
    const handleDecreaseQuantity = () => {
        if (selectedProduct && selectedProduct.quantityPurchase > 1) {
            selectedProduct.quantityPurchase -= 1;
            const currentPrice = getCurrentPrice(); // Get the current price
            updateCart(selectedProduct.id, selectedProduct.quantityPurchase, activeColor, currentPrice);
        }
    };

    const handleAddToCart = () => {
        if (selectedProduct) {
            // Check if the product is already in the cart
            if (!cartState.cartArray.find(item => item.id === selectedProduct.id && item.selectedColor === activeColor)) {
                // If not, add it to the cart with the required parameters
                addToCart(selectedProduct, activeColor, activeColor, getCurrentPrice()); // Pass selectedColor, activeColor, and currentPrice
            }
    
            // Get the current price based on the selected color
            const currentPrice = getCurrentPrice();
    
            // Update the cart with the current quantity, selected color, and price
            updateCart(selectedProduct.id, selectedProduct.quantityPurchase, activeColor, currentPrice);
    
            // Open the cart modal and close the quickview
            openModalCart();
            closeQuickview();
        }
    };
    

    const handleAddToWishlist = () => {
        if (selectedProduct) {
            if (wishlistState.wishlistArray.some(item => item.id === selectedProduct.id)) {
                removeFromWishlist(selectedProduct.id);
            } else {
                addToWishlist(selectedProduct);
            }
        }
        openModalWishlist();
    };

    const handleAddToCompare = () => {
        if (selectedProduct) {
            if (compareState.compareArray.length < 3) {
                if (compareState.compareArray.some(item => item.id === selectedProduct.id)) {
                    removeFromCompare(selectedProduct.id);
                } else {
                    addToCompare(selectedProduct);
                }
            } else {
                alert('Compare up to 3 products');
            }
        }
        openModalCompare();
    };

    return (
        <>
            <div className={`modal-quickview-block`} onClick={closeQuickview}>
                <div
                    className={`modal-quickview-main py-6 ${selectedProduct !== null ? 'open' : ''}`}
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <div className="flex h-full max-md:flex-col-reverse gap-y-6">
                        <div className="left lg:w-[388px] md:w-[300px] flex-shrink-0 px-6">
                            <div className="list-img max-md:flex items-center gap-4">
                                {selectedProduct?.images.map((item, index) => (
                                    <div className="bg-img w-full aspect-[3/4] max-md:w-[150px] max-md:flex-shrink-0 rounded-[20px] overflow-hidden md:mt-6" key={index}>
                                        <Image
                                            src={item}
                                            width={1500}
                                            height={2000}
                                            alt={item}
                                            priority={true}
                                            className='w-full h-full object-cover'
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="right w-full px-4">
                            <div className="heading pb-6 px-4 flex items-center justify-between relative">
                                <div className="heading5">Quick View</div>
                                <div
                                    className="close-btn absolute right-0 top-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
                                    onClick={closeQuickview}
                                >
                                    <Icon.X size={14} />
                                </div>
                            </div>
                            <div className="product-infor px-4">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="caption2 text-secondary font-semibold uppercase">{selectedProduct?.type}</div>
                                        <div className="heading4 mt-1">{selectedProduct?.name}</div>
                                    </div>
                                    <div
                                        className={`add-wishlist-btn w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-lg duration-300 flex-shrink-0 hover:bg-black hover:text-white ${wishlistState.wishlistArray.some(item => item.id === selectedProduct?.id) ? 'active' : ''}`}
                                        onClick={handleAddToWishlist}
                                    >
                                        {wishlistState.wishlistArray.some(item => item.id === selectedProduct?.id) ? (
                                            <Icon.Heart size={20} weight='fill' className='text-red' />
                                        ) : (
                                            <Icon.Heart size={20} />
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center mt-3">
                                    <Rate currentRate={selectedProduct?.rate} size={14} />
                                    <span className='caption1 text-secondary'>(1.234 reviews)</span>
                                </div>
                                <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
                                    <div className="product-price heading5">₦{getCurrentPrice().toFixed(2)}</div>
                                    <div className='desc text-secondary mt-3'>{selectedProduct?.description}</div>
                                </div>
                                <div className="list-action mt-6">
                                    <div className="choose-color">
                                        <div className="text-title">Size: <span className='text-title color'>{activeColor}</span></div>
                                        <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                                            {selectedProduct && (
                                                <ColorDropdown
                                                    product={selectedProduct}
                                                    activeColor={activeColor}
                                                    onColorSelect={handleColorSelect} 
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-title mt-5">Quantity:</div>
                                    <div className="choose-quantity flex items-center max-xl:flex-wrap lg:justify-between gap-5 mt-3">
                                        <div className="quantity-block md:p-3 max-md:py-1.5 max-md:px-3 flex items-center justify-between rounded-lg border border-line sm:w-[180px] w-[120px] flex-shrink-0">
                                            <Icon.Minus
                                                onClick={handleDecreaseQuantity}
                                                className={`${selectedProduct?.quantityPurchase === 1 ? 'disabled' : ''} cursor-pointer body1`}
                                            />
                                            <div className="body1 font-semibold">{selectedProduct?.quantityPurchase}</div>
                                            <Icon.Plus
                                                onClick={handleIncreaseQuantity}
                                                className='cursor-pointer body1'
                                            />
                                        </div>
                                        <div onClick={handleAddToCart} className="button-main w-full text-center bg-white text-black border border-black">Add To Cart</div>
                                    </div>
                                    <div className="button-block mt-5">
                                        <div className="button-main w-full text-center">Buy It Now</div>
                                    </div>
                                    <div className="flex items-center flex-wrap lg:gap-20 gap-8 gap-y-4 mt-5">
                                        <div className="compare flex items-center gap-3 cursor-pointer" onClick={handleAddToCompare}>
                                            <div
                                                className="compare-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white"
                                            >
                                                <Icon.ArrowsCounterClockwise className='heading6' />
                                            </div>
                                            <span>Compare</span>
                                        </div>
                                        <div className="share flex items-center gap-3 cursor-pointer">
                                            <div className="share-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white">
                                                <Icon.ShareNetwork weight='fill' className='heading6' />
                                            </div>
                                            <span>Share Products</span>
                                        </div>
                                    </div>
                                    <div className="more-infor mt-6">
                                        <div className="flex items-center gap-4 flex-wrap">
                                            <div className="flex items-center gap-1">
                                                <Icon.ArrowClockwise className='body1' />
                                                <div className="text-title">Delivery & Return</div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Icon.Question className='body1' />
                                                <div className="text-title">Ask A Question</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 mt-3">
                                            <div className="text-title">SKU:</div>
                                            <div className="text-secondary">53453412</div>
                                        </div>
                                        <div className="flex items-center gap-1 mt-3">
                                            <div className="text-title">Categories:</div>
                                            <div className="text-secondary">{selectedProduct?.category}, {selectedProduct?.tag}</div>
                                        </div>
                                        <div className="flex items-center gap-1 mt-3">
                                            <div className="text-title">Tag:</div>
                                            <div className="text-secondary">{selectedProduct?.type}</div>
                                        </div>
                                    </div>
                                    <div className="list-payment mt-7">
                                        <div className="main-content lg:pt-8 pt-6 lg:pb-6 pb-4 sm:px-4 px-3 border border-line rounded-xl relative max-md:w-2/3 max-sm:w-full">
                                            <div className="heading6 px-5 bg-white absolute -top-[14px] left-1/2 -translate-x-1/2 whitespace-nowrap">Guaranteed safe checkout</div>
                                            <div className="list grid grid-cols-6">
                                                <div className="item flex items-center justify-center lg:px-3 px-1">
                                                    <Image
                                                        src={'/images/payment/Frame-0.png'}
                                                        width={500}
                                                        height={450}
                                                        alt='payment'
                                                        className='w-full'
                                                    />
                                                </div>
                                                <div className="item flex items-center justify-center lg:px-3 px-1">
                                                    <Image
                                                        src={'/images/payment/Frame-1.png'}
                                                        width={500}
                                                        height={450}
                                                        alt='payment'
                                                        className='w-full'
                                                    />
                                                </div>
                                                <div className="item flex items-center justify-center lg:px-3 px-1">
                                                    <Image
                                                        src={'/images/payment/Frame-2.png'}
                                                        width={500}
                                                        height={450}
                                                        alt='payment'
                                                        className='w-full'
                                                    />
                                                </div>
                                                <div className="item flex items-center justify-center lg:px-3 px-1">
                                                    <Image
                                                        src={'/images/payment/Frame-3.png'}
                                                        width={500}
                                                        height={450}
                                                        alt='payment'
                                                        className='w-full'
                                                    />
                                                </div>
                                                <div className="item flex items-center justify-center lg:px-3 px-1">
                                                    <Image
                                                        src={'/images/payment/Frame-4.png'}
                                                        width={500}
                                                        height={450}
                                                        alt='payment'
                                                        className='w-full'
                                                    />
                                                </div>
                                                <div className="item flex items-center justify-center lg:px-3 px-1">
                                                    <Image
                                                        src={'/images/payment/Frame-5.png'}
                                                        width={500}
                                                        height={450}
                                                        alt='payment'
                                                        className='w-full'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalQuickview;