'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuMarketplace from '@/components/Header/Menu/MenuMarketplace';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from '@/context/CartContext';
import ShippingCalculator from './Shipping'; 
import { countdownTime } from '@/store/countdownTime';
import axios from 'axios';

const Cart = () => {
    const [timeLeft, setTimeLeft] = useState(countdownTime());
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(countdownTime());
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    
    const { cartState, updateCart, removeFromCart } = useCart();
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [voucherCode, setVoucherCode] = useState("");
    const [totalCart, setTotalCart] = useState<number>(0);
    const [discountCart, setDiscountCart] = useState<number>(0);
    const [shipCart, setShipCart] = useState<number>(3000);
    const [discountMessage, setDiscountMessage] = useState("");
    const [loading, setLoading] = useState(false);

    let moneyForFreeship = 100000;

    useEffect(() => {
        let total = 0;
        cartState.cartArray.forEach(item => {
            total += item.price * item.quantity;
        });
        setTotalCart(total);
    }, [cartState.cartArray]);

    const handleRemove = (productId: string, selectedColor: string) => {
        removeFromCart(productId, selectedColor);
    };

    const handleQuantityChange = (productId: string, selectedColor: string, newQuantity: number) => {
        const itemToUpdate = cartState.cartArray.find((item) => item.id === productId && item.selectedColor === selectedColor);
    
        if (itemToUpdate) {
            const selectedVariation = itemToUpdate.variation.find(
                (variation) => variation.colorCode === selectedColor
            );
            const updatedPrice = selectedVariation ? selectedVariation.price : itemToUpdate.price;
            updateCart(productId, newQuantity, selectedColor, updatedPrice);
        }
    };

    const handleApplyCode = async (code: string) => {
        setLoading(true);
        setDiscountMessage("");
        try {
            const response = await axios.post('https://steadfastpadibackend.onrender.com/verify-code', { code });
            if (response.data.success) {
                const discount = 1; // Apply 1% discount
                const discountAmount = totalCart * (discount / 100);
                setDiscountCart(discountAmount);
                setTotalCart(totalCart - discountAmount);
                setDiscountMessage("Discount applied successfully!");
                sessionStorage.setItem('discountCode', code); // Store in session storage
            } else {
                setDiscountMessage('Invalid code');
            }
        } catch (error) {
            setDiscountMessage('Error verifying code');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleApplyCode(voucherCode);
    };

    const [shippingDetails, setShippingDetails] = useState<{ state: string; rate: number }>({
        state: '',
        rate: 0,
    });

    const handleShippingSelect = (state: string, rate: number) => {
        setShippingDetails({ state, rate });
    };

    useEffect(() => {
        if (totalCart < moneyForFreeship) {
            setShipCart(shippingDetails.rate || 0);
        } else {
            setShipCart(0);
        }
        if (cartState.cartArray.length === 0) {
            setShipCart(0);
        }
    }, [totalCart, shippingDetails, cartState.cartArray, moneyForFreeship]);

    const redirectToCheckout = () => {
        router.push(`/checkout?ship=${shipCart}`); // No discount code in URL
    };

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className='relative w-full'>
            <MenuMarketplace SubMenuDepartment={false} />
            <Breadcrumb heading='Shopping cart' subHeading='Shopping cart' />
        </div>
            <div className="cart-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
                        <div className="xl:w-2/3 xl:pr-3 w-full">
                            <div className="time bg-green py-3 px-5 flex items-center rounded-lg">
                                <div className="heding5">🔥</div>
                                <div className="caption1 pl-2">Your cart will expire in
                                    <span className="min text-red text-button fw-700"> {timeLeft.minutes}:{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
                                    <span> minutes! Please checkout now before your items sell out!</span>
                                </div>
                            </div>
                            <div className="heading banner mt-5">
                                <div className="text">Buy
                                    <span className="text-button"> ₦<span className="more-price">{moneyForFreeship - totalCart > 0 ? (<>{moneyForFreeship - totalCart}</>) : (0)}</span>.00 </span>
                                    <span>more to get </span>
                                    <span className="text-button">freeship</span>
                                </div>
                                <div className="tow-bar-block mt-4">
                                    <div
                                        className="progress-line"
                                        style={{ width: totalCart <= moneyForFreeship ? `₦{(totalCart / moneyForFreeship) * 100}%` : `100%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="list-product w-full sm:mt-7 mt-5">
                                <div className='w-full'>
                                    <div className="heading bg-surface bora-4 pt-4 pb-4">
                                        <div className="flex">
                                            <div className="w-1/2">
                                                <div className="text-button text-center">Products</div>
                                            </div>
                                            <div className="w-1/12">
                                                <div className="text-button text-center">Price</div>
                                            </div>
                                            <div className="w-1/6">
                                                <div className="text-button text-center">Quantity</div>
                                            </div>
                                            <div className="w-1/6">
                                                <div className="text-button text-center">Total Price</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-product-main w-full mt-3">
                                        {cartState.cartArray.length < 1 ? (
                                            <p className='text-button pt-3'>No product in cart</p>
                                        ) : (
                                            cartState.cartArray.map((product) => (
                                                <div className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full" key={product.id}>
                                                    <div className="w-1/2">
                                                        <div className="flex items-center gap-6">
                                                            <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
                                                                <Image
                                                                    src={product.thumbImage[0]}
                                                                    width={1000}
                                                                    height={1000}
                                                                    alt={product.name}
                                                                    className='w-full h-full object-cover rounded-lg'
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="text-title">{product.name}-{product.selectedColor}</div>
                                                                <div className="list-select mt-3"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-1/12 price flex items-center justify-center">
                                                        <div className="text-title text-center">₦{product.price}.00</div>
                                                    </div>
                                                    <div className="w-1/6 flex items-center justify-center">
                                                        <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
                                                            <Icon.Minus
                                                                onClick={() => handleQuantityChange(product.id, product.selectedColor, product.quantity - 1)}
                                                                className={`text-base max-md:text-sm ${product.quantity === 1 ? 'disabled' : ''}`}
                                                            />
                                                            <div className="text-button quantity">{product.quantity}</div>
                                                            <Icon.Plus
                                                                onClick={() => handleQuantityChange(product.id, product .selectedColor, product.quantity + 1)}
                                                                className="text-base max-md:text-sm" />
                                                        </div>
                                                    </div>
                                                    <div className="w-1/6 flex total-price items-center justify-center">
                                                        <div className="text-title text-center">₦{product.quantity * product.price}.00</div>
                                                    </div>
                                                    <div className="w-1/12 flex items-center justify-center">
                                                        <Icon.XCircle
                                                            className='text-xl max-md:text-base text-red cursor-pointer hover:text-black duration-500'
                                                            onClick={() => handleRemove(product.id, product.selectedColor)}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="input-block discount-code w-full h-12 sm:mt-7 mt-5">
                                <form className='w-full h-full relative mb-4' onSubmit={handleSubmit}>
                                    <input type="text" placeholder='Add voucher discount' className='w-full h-full bg-surface pl-4 pr-14 rounded-lg border border-line' required value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} />
                                    <button type="submit" className='button-main absolute top-1 bottom-1 right-1 px-5 rounded-lg flex items-center justify-center' disabled={loading}>
                                        {loading ? 'Applying...' : 'Apply Code'}
                                    </button>
                                </form>
                            </div>
                            {discountMessage && <div className="text-red mt-2">{discountMessage}</div>}
                            <div className="list-voucher flex items-center gap-5 flex-wrap sm:mt-7 mt-5">
                                <ShippingCalculator onShippingSelect={handleShippingSelect} />
                            </div>
                        </div>
                        <div className="xl:w-1/3 xl:pl-12 w-full">
                            <div className="checkout-block bg-surface p-6 rounded-2xl">
                                <div className="heading5">Order Summary</div>
                                <div className="total-block py-5 flex justify-between border-b border-line">
                                    <div className="text-title">Subtotal</div>
                                    <div className="text-title">₦<span className="total-product">{totalCart}</span><span>.00</span></div>
                                </div>
                                <div className="discount-block py-5 flex justify-between border-b border-line">
                                    <div className="text-title">Discounts</div>
                                    <div className="text-title"> <span>-₦</span><span className="discount">{discountCart}</span><span>.00</span></div>
                                </div>
                                <div className="ship-block py-5 flex justify-between border-b border-line">
                                    <div className="text-title">Shipping</div>
                                    <div className="choose-type flex gap-12">
                                        <div className="left">
                                            <div className="type">
                                                {moneyForFreeship - totalCart > 0 ?
                                                    <input id="shipping" type="radio" name="ship" disabled />
                                                    :
                                                    <input
                                                        id="shipping"
                                                        type="radio"
                                                        name="ship"
                                                        checked={true}
                                                        onChange={() => setShipCart(0)}
                                                    />
                                                }
                                                <label className="pl-1" htmlFor="shipping">Free Shipping:</label>
                                            </div>
                                            <div className="type mt-1">
                                                {moneyForFreeship - totalCart < 0 ?
                                                    <input id="shipping" type="radio" name="ship" disabled />
                                                    :
                                                    <input
                                                        id="local"
                                                        type="radio"
                                                        name="ship"
                                                        value={0} // Assuming free shipping has a value of 0
                                                        checked={true}
                                                        onClick={(e) => e.preventDefault()}
                                                    />
                                                }
                                                <label className="text-on-surface -variant1 pl-1" htmlFor="local">Local:</label>
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="ship">₦0.00</div>
                                            <div className="local text-on-surface-variant1 mt-1">₦{shippingDetails.rate}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="total-cart-block pt-4 pb-4 flex justify-between">
                                    <div className="heading5">Total</div>
                                    <div className="heading5">₦
                                        <span className="total-cart heading5">{totalCart - discountCart + shipCart} </span>
                                        <span className='heading5'>.00</span>
                                    </div>
                                </div>
                                <div className="block-button flex flex-col items-center gap-y-4 mt-5">
                                    <div className="checkout-btn button-main text-center w-full" onClick={redirectToCheckout}>Process To Checkout</div>
                                    <Link className="text-button hover-underline" href={"/shop/breadcrumb-img"}>Continue shopping</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;