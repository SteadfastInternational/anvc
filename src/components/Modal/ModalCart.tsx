"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from "@/type/ProductType";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useCart } from "@/context/CartContext";
import { countdownTime } from "@/store/countdownTime";
import CountdownTimeType from "@/type/CountdownType";

const ModalCart = ({ serverTimeLeft }: { serverTimeLeft: CountdownTimeType }) => {
  const [timeLeft, setTimeLeft] = useState(serverTimeLeft);
  const [productData, setProductData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(countdownTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Get the base API URL from environment variables
        if (!apiUrl) {
          throw new Error("API URL is not defined in the environment variables.");
        }

        // Fetch products from the API
        const response = await fetch(`${apiUrl}/products`); // Adjust the endpoint as needed
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = (await response.json()) as ProductType[]; // Assert the type of the fetched data
      
        setProductData(data); // Assuming the data is an array of products
      } catch (err) {
        const errorMessage = (err as Error).message || "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Fetch data when the component mounts

  const [activeTab, setActiveTab] = useState<string | undefined>("");
  const { isModalOpen, closeModalCart } = useModalCartContext();
  const { cartState, addToCart, removeFromCart, updateCart } = useCart();

  const handleAddToCart = (
    productItem: ProductType,
    selectedColor: string | null,
    activeColor: string | null
  ) => {
    // Default to the first variation if no color is selected
    const selectedVariation = productItem.variation.find(
      (variation) => variation.colorCode === selectedColor
    ) || productItem.variation[0];

    if (!selectedVariation) {
      console.error("No valid variation found.");
      return;
    }

    const updatedItem = {
      ...productItem,
      selectedColor: selectedVariation.colorCode,
      price: selectedVariation.price, // Use the price from the selected variation
    };

    // Check if the item is already in the cart by product ID and selected color
    const existingItem = cartState.cartArray.find(
      (item) => item.id === productItem.id && item.selectedColor === selectedVariation.colorCode
    );

    // If the item doesn't exist in the cart, add it
    if (!existingItem) {
      addToCart(
        updatedItem,
        selectedVariation.colorCode,
        activeColor || selectedVariation.colorCode, // Use the active color as fallback
        selectedVariation.price // Pass the price as the fourth argument
      );
    } else {
      // If the item exists in the cart, update it
      const newQuantity = existingItem.quantity + 1; // Default increment quantity is 1
      updateCart(
        productItem.id,
        newQuantity,
        selectedVariation.colorCode,
        updatedItem.price
      );
    }
  };

  let moneyForFreeship = 100000;
  let [totalCart, setTotalCart] = useState<number>(0);
  let [discountCart, setDiscountCart] = useState<number>(0);

  // Calculate total cart value
  cartState.cartArray.forEach((item) => {
    totalCart += item.price * item.quantity;
  });

  if (loading) {
    return <div>Loading...</div>; // You can customize this loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Handle error state
  }


    return (
        <>
            <div className={`modal-cart-block`} onClick={closeModalCart}>
                <div
                    className={`modal-cart-main flex ${isModalOpen ? 'open' : ''}`}
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <div className="left w-1/2 border-r border-line py-6 max-md:hidden">
                        <div className="heading5 px-6 pb-3">You May Also Like</div>
                        <div className="list px-6">
                            {Array.isArray(productData) && productData.slice(0, 4).map((product) => (
                                <div key={product.id} className='item py-5 flex items-center justify-between gap-3 border-b border-line'>
                                    <div className="infor flex items-center gap-5">
                                        <div className="bg-img">
                                            <Image
                                                src={product.images[0]}
                                                width={300}
                                                height={300}
                                                alt={product.name}
                                                className='w-[100px] aspect-square flex-shrink-0 rounded-lg'
                                            />
                                        </div>
                                        <div className=''>
                                            <div className="name text-button">{product.name}</div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="product-price text-title">₦{product.price}.00</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                      className="text-xl bg-white w-10 h-10 rounded-xl border border-black flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
                                      onClick={e => {
                                          e.stopPropagation();
                                          handleAddToCart(
                                              product, 
                                              product.activeColor || product.variation[0]?.colorCode, // Pass the active color or fallback to the first variation
                                              product.activeColor || product.variation[0]?.colorCode, // Pass the active color again for `activeColor`
                                          );
                                      }}
                                      
                                    >
                                        <Icon.Handbag />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="right cart-block md:w-1/2 w-full py-6 relative overflow-hidden">
                        <div className="heading px-6 pb-3 flex items-center justify-between relative">
                            <div className="heading5">Shopping Cart</div>
                            <div
                                className="close-btn absolute right-6 top-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
                                onClick={closeModalCart}
                            >
                                <Icon.X size={14} />
                            </div>
                        </div>
                        <div className="time px-6">
                            <div className="flex items-center gap-3 px-5 py-3 bg-green rounded-lg">
                                <p className='text-3xl'>🔥</p>
                                <div className="caption1">Your cart will expire in <span className='text-red caption1 font-semibold'>{timeLeft.minutes}:
                                    {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span> minutes!<br />
                                    Please checkout now before your items sell out!</div>
                            </div>
                        </div>
                        <div className="heading banner mt-3 px-6">
                            <div className="text">Buy <span className="text-button"> <span className="more-price">{moneyForFreeship - totalCart > 0 ? (<>{moneyForFreeship - totalCart}</>) : (0)}</span>.00 </span>
                                <span>more to get </span>
                                <span className="text-button">freeship</span></div>
                            <div className="tow-bar-block mt-3">
                                <div
                                    className="progress-line"
                                    style={{ width: totalCart <= moneyForFreeship ? `${(totalCart / moneyForFreeship) * 100}%` : `100%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="list-product px-6">
                            {cartState.cartArray.map((product) => (
                                <div key={product.id} className='item py-5 flex items-center justify-between gap-3 border-b border-line'>
                                    <div className="infor flex items-center gap-3 w-full">
                                        <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                                            <Image
                                                src={product.images[0]}
                                                width={300}
                                                height={300}
                                                alt={product.name}
                                                className='w-full h-full'
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <div className="flex items-center justify-between w-full">
                                                <div className="name text-button">{product.name}</div>
                                                <div
                                                    className="remove-cart-btn caption1 font-semibold text-red underline cursor-pointer"
                                                    onClick={() => {
                                                        removeFromCart(product.id, product.selectedColor);
                                                    }}
                                                >
                                                    Remove
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-2 mt-3 w-full">
                                                <div className="flex items-center text-secondary2 capitalize">
                                                    {product.selectedColor}   X {product.quantity}
                                                </div>
                                                <div className="product-price text-title">₦{product.price}.00</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="footer-modal bg-white absolute bottom-0 left-0 w-full">
                            <div className="flex items-center justify-center lg:gap-14 gap-8 px-6 py-4 border-b border-line">
                                {/* Additional footer content can be added here */}
                            </div>
                            <div className="flex items-center justify-between pt-6 px-6">
                                <div className="heading5">Subtotal</div>
                                <div className="heading5">₦{totalCart}.00</div>
                            </div>
                            <div className="block-button text-center p-6 flex flex-col items-center justify-center">
                                <div className="flex items-center justify-center w-full">
                                    <Link
                                        href={'/cart'}
                                        className="button-main text-center uppercase w-full py-2" // Added w-full to fill space
                                        onClick={closeModalCart}
                                    >
                                        View Cart
                                    </Link>
                                </div>
                                <div 
                                    onClick={closeModalCart} 
                                    className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block"
                                >
                                    Or continue shopping
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalCart;