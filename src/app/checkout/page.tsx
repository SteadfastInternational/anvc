'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuMarketplace from '@/components/Header/Menu/MenuMarketplace';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from '@/context/CartContext';
import { useSearchParams } from 'next/navigation';
import useLoginPopup from '@/store/useLoginPopup';

const Checkout = () => {
    const searchParams = useSearchParams();
    const ship = searchParams.get('ship');

    const { cartState } = useCart();
    const [totalCart, setTotalCart] = useState<number>(0);
    const [activePayment, setActivePayment] = useState<string>('credit-card');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [discount, setDiscount] = useState<number>(0);
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        alternativePhoneNumber: '',
        city: '',
        country: '',
        apartment: '',
        note: ''
    });
    const [formErrors, setFormErrors] = useState({
        firstName: false,
        lastName: false,
        phoneNumber: false,
        alternativePhoneNumber: false,
        city: false,
        country: false,
        apartment: false,
    });
    const [loading, setLoading] = useState<boolean>(false); // Loading state

    const { openLoginPopup, handleLoginPopup, isLoggedIn } = useLoginPopup();

    useEffect(() => {
        let total = 0;
        cartState.cartArray.forEach(item => {
            total += item.price * item.quantity;
        });
        setTotalCart(total);
    }, [cartState.cartArray]);

    useEffect(() => {
        const storedDiscountCode = sessionStorage.getItem('discountCode');
        if (storedDiscountCode) {
            const discountAmount = (totalCart * 0.02); 
            setDiscount(discountAmount);
        }
    }, [totalCart]);

    const handlePayment = (item: string) => {
        setActivePayment(item);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {  // Using environment variable for URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('jwt', data.token);
                setMessage('Login successful!');
                handleLoginPopup();
            } else {
                setMessage(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset form errors
        setFormErrors({
            firstName: false,
            lastName: false,
            phoneNumber: false,
            alternativePhoneNumber: false,
            city: false,
            country: false,
            apartment: false,
        });

        // Validate required fields
        let hasError = false;
        const { firstName, lastName, phoneNumber, alternativePhoneNumber, city, country, apartment } = address;

        if (!firstName) {
            setFormErrors(prev => ({ ...prev, firstName: true }));
            hasError = true;
        }
        if (!lastName) {
            setFormErrors(prev => ({ ...prev, lastName: true }));
            hasError = true;
        }
        if (!phoneNumber) {
            setFormErrors(prev => ({ ...prev, phoneNumber: true }));
            hasError = true;
        }
        if (!alternativePhoneNumber) {
            setFormErrors(prev => ({ ...prev, alternativePhoneNumber: true }));
            hasError = true;
        }
        if (!city) {
            setFormErrors(prev => ({ ...prev, city: true }));
            hasError = true;
        }
        if (!country) {
            setFormErrors(prev => ({ ...prev, country: true }));
            hasError = true;
        }
        if (!apartment) {
            setFormErrors(prev => ({ ...prev, apartment: true }));
            hasError = true;
        }

        if (hasError) {
            return; // Stop the checkout process if validation fails
        }

        setLoading(true); // Start loading state

        const items = cartState.cartArray.map(product => ({
            productName: `${product.name}-${product.selectedColor}`,
            quantity: product.quantity,
        }));

        const couponCode = sessionStorage.getItem('discountCode') || '';

        const totalPrice = totalCart - discount + Number(ship);

        const payload = {
            items,
            couponCode,
            address,
            totalPrice,
        };


        console.log('Payload being sent to the backend:', JSON.stringify(payload, null, 2));

        const token = localStorage.getItem('jwt');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {  // Using environment variable for URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                window.location.href = data.paymentUrl; // Redirect to payment URL
            } else {
                setMessage(data.message || 'Checkout failed. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };




    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="ENJOY FREE SHIPPING ON ORDERS OVER ₦100,000" />
            <div id="header" className='relative w-full'>
                <MenuMarketplace SubMenuDepartment={false} />
                <Breadcrumb heading='Checkout' subHeading='Checkout' />
            </div>
            <div className="cart-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex justify-between">
                        <div className="left w-1/2">
                            {!isLoggedIn ? (
                                <div className="form-login-block mt-3">
                                    <form className="p-5 border border-line rounded-lg" onSubmit={handleLogin}>
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div className="email ">
                                                <input
                                                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                                    id="username"
                                                    type="email"
                                                    placeholder="Username or email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="pass ">
                                                <input
                                                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                                                    id="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="block-button mt-3">
                                            <button className="button-main button-blue-hover">Login</button>
                                        </div>
                                    </form>
                                    <div className="message mt-3 text-red-500">{message}</div>
                                </div>
                            ) : (
                                <div className="success-message mt-3 text-green-500">You are already logged in.</div>
                            )}
                            <div className="information mt-5">
                                <div className="heading5">Information</div>
                                <div className="form-checkout mt-5">
                                    <form onSubmit={handleCheckout}>
                                        <div className="grid sm:grid-cols-2 gap-4 gap-y-5 flex-wrap">
                                            <div className="">
                                                <input
                                                    className={`border-line px-4 py-3 w-full rounded-lg ${formErrors.firstName ? 'border-red-500' : ''}`}
                                                    id="firstName"
                                                    type="text"
                                                    placeholder="First Name *"
                                                    required
                                                    onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                                                />
                                            </div>
                                            <div className="">
                                                <input
                                                    className={`border-line px-4 py-3 w-full rounded-lg ${formErrors.lastName ? 'border-red-500' : ''}`}
                                                    id="lastName"
                                                    type="text"
                                                    placeholder="Last Name *"
                                                    required
                                                    onChange ={(e) => setAddress({ ...address, lastName: e.target.value })}
                                                />
                                            </div>
                                            <div className="">
                                                <label htmlFor="phoneNumber" className="sr-only">Phone Number </label>
                                                <input
                                                    className={`border-line px-4 py-3 w-full rounded-lg ${formErrors.phoneNumber ? 'border-red-500' : ''}`}
                                                    id="phoneNumber"
                                                    type="tel"
                                                    placeholder="Phone Number"
                                                    required
                                                    pattern="[0-9]*"
                                                    aria-required="true"
                                                    onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                                                />
                                            </div>
                                            <div className="">
                                                <label htmlFor="alternativePhoneNumber" className="sr-only">Alternative Phone Number</label>
                                                <input
                                                    className={`border-line px-4 py-3 w-full rounded-lg ${formErrors.alternativePhoneNumber ? 'border-red-500' : ''}`}
                                                    id="alternativePhoneNumber"
                                                    type="tel"
                                                    placeholder="Alternative Phone Number"
                                                    required
                                                    pattern="[0-9]*"
                                                    aria-required="true"
                                                    onChange={(e) => setAddress({ ...address, alternativePhoneNumber: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-span-full select-block">
                                                <input
                                                    className={`border-line px-4 py-3 w-full rounded-lg ${formErrors.city ? 'border-red-500' : ''}`}
                                                    id="city"
                                                    type="text"
                                                    placeholder="Delivery Address"
                                                    required
                                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                                />
                                            </div>
                                            <div className="select-block">
                                                <select
                                                    className={`border border-line px-4 py-3 w-full rounded-lg ${formErrors.country ? 'border-red-500' : ''}`}
                                                    id="country"
                                                    name="country"
                                                    defaultValue={'default'}
                                                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                                                >
                                                    <option value="default" disabled>Choose State.</option>
                                                    <option value="Abia">Abia</option>
    <option value="Adamawa">Adamawa</option>
    <option value="Akwa Ibom">Akwa Ibom</option>
    <option value="Anambra">Anambra</option>
    <option value="Bauchi">Bauchi</option>
    <option value="Bayelsa">Bayelsa</option>
    <option value="Benue">Benue</option>
    <option value="Borno">Borno</option>
    <option value="Cross River">Cross River</option>
    <option value="Delta">Delta</option>
    <option value="Ebonyi">Ebonyi</option>
    <option value="Edo">Edo</option>
    <option value="Ekiti">Ekiti</option>
    <option value="Enugu">Enugu</option>
    <option value="Gombe">Gombe</option>
    <option value="Imo">Imo</option>
    <option value="Jigawa">Jigawa</option>
    <option value="Kaduna">Kaduna</option>
    <option value="Kano">Kano</option>
    <option value="Kogi">Kogi</option>
    <option value="Kwara">Kwara</option>
    <option value="Lagos">Lagos</option>
    <option value="Nasarawa">Nasarawa</option>
    <option value="Niger">Niger</option>
    <option value="Ogun">Ogun</option>
    <option value="Ondo">Ondo</option>
    <option value="Osun">Osun</option>
    <option value="Oyo">Oyo</option>
    <option value="Plateau">Plateau</option>
    <option value="Rivers">Rivers</option>
    <option value="Sokoto">Sokoto</option>
    <option value="Taraba">Taraba</option>
    <option value="Yobe">Yobe</option>
    <option value="Zamfara">Zamfara</option>
    </select>
   <Icon.CaretDown className='arrow-down' />
                                            </div>
                                            <div className="">
                                                <input
                                                    className={`border-line px-4 py-3 w-full rounded-lg ${formErrors.apartment ? 'border-red-500' : ''}`}
                                                    id="apartment"
                                                    type="text"
                                                    placeholder="Town"
                                                    required
                                                    onChange={(e) => setAddress({ ...address, apartment: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-span-full">
                                                <textarea
                                                    className="border border-line px-4 py-3 w-full rounded-lg"
                                                    id="note"
                                                    name="note"
                                                    placeholder="Write note..."
                                                    onChange={(e) => setAddress({ ...address, note: e.target.value })}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="payment-block md:mt-10 mt-6">
                                            <div className="heading5">Choose payment Option:</div>
                                            <div className="list-payment mt-5">
                                                <div className={`type bg-surface p-5 border border-line rounded-lg ${activePayment === 'credit-card' ? 'close' : ''}`}>
                                                    <input
                                                        className="cursor-pointer"
                                                        type="radio"
                                                        id="credit"
                                                        name="payment"
                                                        checked={activePayment === 'credit-card'}
                                                        onChange={() => handlePayment('credit-card')}
                                                    />
                                                    <label className="text-button pl-2 cursor-pointer" htmlFor="credit">Paystack(Credit Card, USSD, Online Banking & Bank Transfers)</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block-button md:mt-10 mt-6">
                                            <button className="button-main w-full" disabled={loading}>
                                                {loading ? 'Processing...' : 'Proceed to Pay.'}
                                            </button>
                                        </div>
                                    </form>
                                    {loading && <div className="loading-indicator">Loading...</div>}
                                     {message && <div className="error-message text-red-500 mt-3">{message}</div>} {/* Display error message */}
                                </div>
                            </div>
                        </div>
                        <div className="right w-5/12">
                            <div className="checkout-block">
                                <div className="heading5 pb-3">Your Order</div>
                                <div className="list-product-checkout">
                                    {cartState.cartArray.length < 1 ? (
                                        <p className='text-button pt-3'>No product in cart</p>
                                    ) : cartState.cartArray.map((product) => (
                                        <div key={product.id} className="item flex items-center justify-between w-full pb-5 border-b border-line gap-6 mt-5">
                                            <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                                                <Image
                                                    src={product.thumbImage[0]}
                                                    width={500}
                                                    height={500}
                                                    alt='img'
                                                    className='w-full h-full'
                                                />
                                            </div>
                                            <div className="flex items-center justify-between w-full">
                                                <div>
                                                    <div className="name text-title">{product.name}</div>
                                                    <div className="caption1 text-secondary mt-2">
                                                        <span className='color capitalize'>{product.selectedColor || product.variation[0].color}</span>
                                                    </div>
                                                </div>
                                                <div className="text-title">
                                                    <span className='quantity'>{product.quantity}</span>
                                                    <span className='px-1'>x</span>
                                                    <span>
                                                        ₦{product.price}.00
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="discount-block py-5 flex justify-between border-b border-line">
                                    <div className="text-title">Discounts</div>
                                    <div className="text-title">-₦<span className="discount">{discount.toFixed(2)}</span></div>
                                </div>
                                <div className="ship-block py-5 flex justify-between border-b border-line">
                                    <div className="text-title">Shipping</div>
                                    <div className="text-title">{Number(ship) === 0 ? 'Free' : `₦${ship}.00`}</div>
                                </div>
                                <div className="total-cart-block pt-5 flex justify-between">
                                    <div className="heading5">Total</div>

                                    <div className="heading5 total-cart">₦{(totalCart - discount + Number(ship)).toFixed(2)}</div>
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

export default Checkout;