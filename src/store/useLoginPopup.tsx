import { useState, useEffect, useCallback } from 'react';

const useLoginPopup = () => {
    const [openLoginPopup, setOpenLoginPopup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkAuthToken = () => {
        try {
            const jwt = localStorage.getItem('jwt');  // JWT token key
            setIsLoggedIn(!!jwt);  // If the JWT exists, the user is logged in
        } catch (error) {
            console.error('Error accessing localStorage:', error);
            setIsLoggedIn(false);
        }
    };

    useEffect(() => {
        checkAuthToken();
    }, []);

    const handleLoginPopup = () => setOpenLoginPopup((prev) => !prev);

    const handleClickOutsideLoginPopup = useCallback((event: Event) => {
        const targetElement = event.target as Element;
        if (openLoginPopup && !targetElement.closest('.login-popup')) {
            setOpenLoginPopup(false);
        }
    }, [openLoginPopup]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideLoginPopup);
        return () => document.removeEventListener('click', handleClickOutsideLoginPopup);
    }, [handleClickOutsideLoginPopup]);

    useEffect(() => {
        const handleStorageChange = () => {
            checkAuthToken();
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return {
        openLoginPopup,
        handleLoginPopup,
        isLoggedIn,
    };
};

export default useLoginPopup;
