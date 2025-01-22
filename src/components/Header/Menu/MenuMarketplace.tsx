import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from 'next/navigation';
import useLoginPopup from '@/store/useLoginPopup';
import useSubMenuDepartment from '@/store/useSubMenuDepartment';
import useMenuMobile from '@/store/useMenuMobile';
import { useModalCartContext } from '@/context/ModalCartContext';
import { useModalWishlistContext } from '@/context/ModalWishlistContext';
import { useCart } from '@/context/CartContext';

interface MenuMarketplaceProps {
  SubMenuDepartment: boolean;  // Define SubMenuDepartment as boolean
}

const MenuMarketplace: React.FC<MenuMarketplaceProps> = ({ SubMenuDepartment }) => {
  const pathname = usePathname();
  const { isLoggedIn, openLoginPopup, handleLoginPopup } = useLoginPopup();  // Use the hook here
  const { openSubMenuDepartment, handleSubMenuDepartment } = useSubMenuDepartment(SubMenuDepartment);
  const { openMenuMobile, handleMenuMobile } = useMenuMobile();
  const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null);
  const { openModalCart } = useModalCartContext();
  const { cartState } = useCart();
  const { openModalWishlist } = useModalWishlistContext();

  const [searchKeyword, setSearchKeyword] = useState('');
  const router = useRouter();

  const handleSearch = (value: string) => {
    router.push(`/search-result?query=${value}`);
    setSearchKeyword('');
  };

  const handleOpenSubNavMobile = (index: number) => {
    setOpenSubNavMobile(openSubNavMobile === index ? null : index);
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/shop/breadcrumb-img?category=${category}`);
  };

  const handleTypeClick = (type: string) => {
    router.push(`/shop/breadcrumb-img?type=${type}`);
  };

  const handleLogout = () => {
    // Remove JWT token from localStorage
    localStorage.removeItem('jwt');
    // Optionally, redirect the user after logout
    router.push('/');
  };

  return (
    <>
      <div className={`header-menu bg-white w-full top-0 z-10 duration-500`}>
        <div className={`header-menu-main style-marketplace relative bg-[#263587] w-full md:h-[74px] h-[56px]`}>
          <div className="container mx-auto h-full">
            <div className="header-main flex items-center justify-between h-full">
              <div className="menu-mobile-icon lg:hidden flex items-center" onClick={handleMenuMobile}>
                <Icon.List className="text-white text-2xl" />
              </div>
              <Link href={'/'} className='flex items-center'>
                <div className="heading4 text-white">Steadfast</div>
              </Link>
              <div className="form-search w-2/3 pl-8 flex items-center h-[44px] max-lg:hidden">
                <div className='w-full flex items-center h-full'>
                  <input className="search-input h-full px-4 w-full border border-line rounded-l"
                    placeholder="What are you looking for today?"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchKeyword)}
                  />
                  <button
                    className="search-button button-main bg-red text-white h-full flex items-center px-7 rounded-none rounded-r"
                    onClick={() => {
                      handleSearch(searchKeyword)
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="right flex gap-12">
                <div className="list-action flex items-center gap-4">
                  <div className="user-icon flex items-center justify-center cursor-pointer">
                    <Icon.User weight="bold" size={24} color="white" onClick={handleLoginPopup} />
                    
                    {/* Conditionally render the popup */}
                    <div
                      className={`login-popup absolute top-[74px] w-[320px] p-7 rounded-xl bg-white box-shadow-sm ${openLoginPopup ? 'open' : ''}`}
                    >
                      {/* If user is logged in, show logged-in popup */}
                      {isLoggedIn ? (
                        <div className="text-center">
                          <p>Hey there, you&lsquo;re logged in!</p>
                          <button
                            className="button-main w-full text-center"
                            onClick={handleLogout} // Trigger the logout function here
                          >
                            Log Out
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Link href="/login" className="button-main w-full text-center">Login</Link>
                          <div className="text-secondary text-center mt-3 pb-4">
                            Don’t have an account?
                            <Link href="/register" className="text-black pl-1 hover:underline">Register</Link>
                          </div>
                        </div>
                      )}

                      <div className="bottom pt-4 border-t border-line"></div>
                      <Link href="#!" className="body1 hover:underline">Support</Link>
                    </div>
                  </div>
      

    
                                    <div className="max-md:hidden wishlist-icon flex items-center cursor-pointer" onClick={openModalWishlist}>
                                        <Icon.Heart weight='bold' size={24} color='white' />
                                    </div>
                                    <div className="cart-icon flex items-center relative cursor-pointer" onClick={openModalCart}>
                                        <Icon.Handbag weight='bold' size={24} color='white' />
                                        <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-red w-4 h-4 flex items-center justify-center rounded-full">{cartState.cartArray.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="top-nav-menu relative bg-white border-b border-line h-[44px] max-lg:hidden z-10">
                    <div className="container h-full">
                        <div className="top-nav-menu-main flex items-center justify-between h-full">
                            <div className="left flex items-center h-full">
                                <div className="menu-department-block relative h-full">
                                    <div
                                        className="menu-department-btn relative flex items-center sm:gap-24 gap-4 h-full w-fit cursor-pointer"
                                        onClick={handleSubMenuDepartment}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon.List className='text-xl max-sm:text-base' />
                                            <div className="text-button whitespace-nowrap">Categories</div>
                                        </div>
                                        <Icon.CaretDown className='text-xl max-sm:text-base' />
                                    </div>
                                    {openSubMenuDepartment && (
                                    <div
                                        className={`sub-menu-department style-marketplace absolute top-[84px] left-0 right-0 px-[26px] py-[5px] bg-surface rounded-xl border border-line ${openSubMenuDepartment ? 'open' : ''}`}
                                    >
                                        <Link href='/shop/breadcrumb-img?type=Chandelier'
                                            className="item py-3 whitespace-nowrap border-b border-line w-full flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <Icon.LampPendant className="text-xl" />
                                                <span className='name'>Chandeliers</span>
                                            </span>
                                            <Icon.CaretRight />
                                        </Link>
                                        <Link href='/shop/breadcrumb-img?type=pop-surface-light'
                                            className="item py-3 whitespace-nowrap border-b border-line w-full flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <Icon.LightbulbFilament className="text-xl" />
                                                <span className='name'>pop-surface-Lights </span>
                                            </span>
                                            <Icon.CaretRight />
                                        </Link>
                                        <Link href='/shop/breadcrumb-img?type=outdoor-light'
                                            className="item py-3 whitespace-nowrap border-b border-line w-full flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <Icon.Lamp className="text-xl" />
                                                <span className='name'>outdoor-Light</span>
                                            </span>
                                            <Icon.CaretRight />
                                        </Link>
                                        <Link href='/shop/breadcrumb-img?type=solar-light'
                                            className="item py-3 whitespace-nowrap border-b border-line w-full flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <Icon.DeviceMobileSpeaker className="text-xl" />
                                                <span className='name'>solar-Light</span>
                                            </span>
                                            <Icon.CaretRight />
                                        </Link>
                                        <Link href='/shop/breadcrumb-img?type=Indoor-Lights'
                                            className="item py-3 whitespace-nowrap border-b border-line w-full flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <Icon.Lamp className="text-xl" />
                                                <span className='name'>indoor-Light</span>
                                            </span>
                                            <Icon.CaretRight />
                                        </Link>
                                        <Link href='/shop/breadcrumb-img?type=Ceiling-Fittings'
                                            className="item py-3 whitespace-nowrap border-b border-line w-full flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <Icon.GameController className="text-xl" />
                                                <span className='name'>Ceiling Fittings</span>
                                            </span>
                                            <Icon.CaretRight />
                                        </Link>
                                        <Link href='/shop/breadcrumb-img?type=pendant-drop-light'
                                            className="item py-3 whitespace-nowrap border-b border-line w-full flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <Icon.GameController className="text-xl" />
                                                <span className='name'>Pendant-Light</span>
                                            </span>
                                            <Icon.CaretRight />
                                        </Link>
                                        <Link href='/shop/breadcrumb-img?type=switch-socket'
                                            className="item py-3 whitespace-nowrap border-b border-line w-full flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <Icon.GameController className="text-xl" />
                                                <span className='name'>Switches & Sockets</span>
                                            </span>
                                            <Icon.CaretRight />
                                        </Link>
                                        <Link href='/shop/breadcrumb-img?type=electrical-accessories'
                                            className="item py-3 whitespace-nowrap border-b border-line w-full flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <Icon.PersonArmsSpread className="text-xl" />
                                                <span className='name'>Electrical Accessories</span>
                                                
                                            </span>
                                            <Icon.CaretRight />
                                        </Link>
                                        <Link href='/shop/breadcrumb-img'
                                            className="item py-3 whitespace-nowrap border-b border-line w-full flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <Icon.Watch className="text-xl" />
                                                <span className='name'>Rope Light</span>
                                            </span>
                                            <Icon.CaretRight />
                                        </Link>
                                        <Link href='/shop/breadcrumb-img'
                                            className="item py-3 whitespace-nowrap w-full flex items-center justify-between">
                                            <span className="flex items-center gap-2">
                                                <Icon.Lamp className="text-xl" />
                                                <span className='name'>Ceiling Fittings</span>
                                            </span>
                                            <Icon.CaretRight />
                                        </Link>
                                    </div>
                                     )}
                                </div>
                                
                                <div className="menu-main style-eight h-full pl-12 max-lg:hidden">
                                    <ul className='flex items-center gap-8 h-full'>
                                        <li className='h-full relative'>
                                            <Link href="#!" className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${pathname.includes('/pages') ? 'active' : ''}`}>
                                                Pages
                                            </Link>
                                            <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
                                                <ul className='w-full'>
                                                    <li>
                                                        <Link href="/pages/about" className={`text-secondary duration-300 ${pathname === '/pages/about' ? 'active' : ''}`}>
                                                            About Us
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/contact" className={`text-secondary duration-300 ${pathname === '/pages/contact' ? 'active' : ''}`}>
                                                            Contact Us
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/store-list" className={`text-secondary duration-300 ${pathname === '/pages/store-list' ? 'active' : ''}`}>
                                                            Store List
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/page-not-found" className={`text-secondary duration-300 ${pathname === '/pages/page-not-found' ? 'active' : ''}`}>
                                                            404
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/faqs" className={`text-secondary duration-300 ${pathname === '/pages/faqs' ? 'active' : ''}`}>
                                                            FAQs
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/coming-soon" className={`text-secondary duration-300 ${pathname === '/pages/coming-soon' ? 'active' : ''}`}>
                                                            Coming Soon
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/customer-feedbacks" className={`text-secondary duration-300 ${pathname === '/pages/customer-feedbacks' ? 'active' : ''}`}>
                                                            Customer Feedbacks
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="right flex items-center gap-1">
                                <div className="caption1">Hotline:</div>
                                <div className="text-button-uppercase">+234-907-651-5161</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="menu-mobile" className={`${openMenuMobile ? 'open' : ''}`}>
                <div className="menu-container bg-white h-full">
                    <div className="container h-full">
                        <div className="menu-main h-full overflow-hidden">
                            <div className="heading py-2 relative flex items-center justify-center">
                                <div
                                    className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                                    onClick={handleMenuMobile}
                                >
                                    <Icon.X size={14} />
                                </div>
                                <Link href={'/'} className='logo text-3xl font-semibold text-center'>Steadfast</Link>
                            </div>
                            <div className="form-search relative mt-2">
                                <Icon.MagnifyingGlass size={20} className='absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer' />
                                <input placeholder='What are you looking for?' className=' h-12 rounded-lg border border-line text-sm w-full pl-10 pr-4' />
                            </div>
                            <div className="list-nav mt-6">
                                <ul>
                                   
                            
                                    <li
                                        className={`${openSubNavMobile === 3 ? 'open' : ''}`}
                                        
                                    >
                                        <Link href={'#!'} className='text-xl font-semibold flex items-center justify-between mt-5'>Categories
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </Link>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(3)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-3 pb-12">
                                                <div className="">
                                                    <div className="nav-link grid grid-cols-2 gap-5 gap-y-6 justify-between">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Shop Features</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/breadcrumb-img'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/breadcrumb-img' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Breadcrumb IMG
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/breadcrumb-img'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/breadcrumb-img' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Breadcrumb 1
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/breadcrumb2'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/breadcrumb2' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Breadcrumb 2
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/collection'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/collection' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Collection
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Shop Features</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/filter-canvas'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/filter-canvas' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Filter Canvas
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/filter-options'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/filter-options' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Filter Options
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/filter-dropdown'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/filter-dropdown' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Filter Dropdown
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/sidebar-list'}
                                                                        className={`text-secondary duration-300 ${pathname === '/shop/sidebar-list' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Sidebar List
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Shop Layout</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/default'}
                                                                        className={`link text-secondary duration-300 cursor-pointer ${pathname === '/shop/default' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Default
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/default-grid'}
                                                                        className={`link text-secondary duration-300 cursor-pointer ${pathname === '/shop/default-grid' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Default Grid
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/default-list'}
                                                                        className={`link text-secondary duration-300 cursor-pointer ${pathname === '/shop/default-list' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Default List
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/fullwidth'}
                                                                        className={`link text-secondary duration-300 cursor-pointer ${pathname === '/shop/fullwidth' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Full Width
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/shop/square'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/shop/square' ? 'active' : ''}`}
                                                                    >
                                                                        Shop Square
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-1">Products Pages</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/wishlist'}
                                                                        className={`text-secondary duration-300 ${pathname === '/wishlist' ? 'active' : ''}`}
                                                                    >
                                                                        Wish List
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/search-result'}
                                                                        className={`text-secondary duration-300 ${pathname === '/search-result' ? 'active' : ''}`}
                                                                    >
                                                                        Search Result
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/cart'}
                                                                        className={`text-secondary duration-300 ${pathname === '/cart' ? 'active' : ''}`}
                                                                    >
                                                                        Shopping Cart
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/login'}
                                                                        className={`text-secondary duration-300 ${pathname === '/login' ? 'active' : ''}`}
                                                                    >
                                                                        Login/Register
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/forgot-password'}
                                                                        className={`text-secondary duration-300 ${pathname === '/forgot-password' ? 'active' : ''}`}
                                                                    >
                                                                        Forgot Password
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/order-tracking'}
                                                                        className={`text-secondary duration-300 ${pathname === '/order-tracking' ? 'active' : ''}`}
                                                                    >
                                                                        Order Tracking
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/my-account'}
                                                                        className={`text-secondary duration-300 ${pathname === '/my-account' ? 'active' : ''}`}
                                                                    >
                                                                        My Account
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuMarketplace