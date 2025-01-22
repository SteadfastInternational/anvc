'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ProductType } from '@/type/ProductType';

interface CartItem extends ProductType {
    activeColor: string; // Active color for the product variation
    quantity: number;    // Quantity of the product
    selectedColor: string; // Selected color for the product variation
    price: number;        // Price of the product
}

interface CartState {
    cartArray: CartItem[];
}

type CartAction =
    | { type: 'ADD_TO_CART'; payload: CartItem }
    | { type: 'REMOVE_FROM_CART'; payload: { itemId: string; selectedColor: string } }
    | {
          type: 'UPDATE_CART';
          payload: {
              itemId: string;
              quantity: number;
              selectedColor: string;
              price: number;
          };
      }
    | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextProps {
    cartState: CartState;
    addToCart: (item: ProductType, selectedColor: string, activeColor: string, price: number) => void;
    removeFromCart: (itemId: string, selectedColor: string) => void;
    updateCart: (itemId: string, quantity: number, selectedColor: string, price: number) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const newItem: CartItem = {
                ...action.payload,
                quantity: 1, // Default quantity
            };
            return {
                ...state,
                cartArray: [...state.cartArray, newItem],
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartArray: state.cartArray.filter(
                    (item) =>
                        !(item.id === action.payload.itemId && item.selectedColor === action.payload.selectedColor)
                ),
            };
        case 'UPDATE_CART':
            return {
                ...state,
                cartArray: state.cartArray.map((item) =>
                    item.id === action.payload.itemId && item.selectedColor === action.payload.selectedColor
                        ? {
                              ...item,
                              quantity: action.payload.quantity,
                              price: parseFloat(action.payload.price.toFixed(2)),
                          }
                        : item
                ),
            };
        case 'LOAD_CART':
            return {
                ...state,
                cartArray: action.payload,
            };
        default:
            return state;
    }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, { cartArray: [] });

    // Load cart state from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            dispatch({ type: 'LOAD_CART', payload: JSON.parse(storedCart) });
        }
    }, []);

    // Save cart state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartState.cartArray));
    }, [cartState.cartArray]);

    const addToCart = (item: ProductType, selectedColor: string, activeColor: string, price: number) => {
        const selectedVariation = item.variation.find(
            (variation) => variation.colorCode === selectedColor
        );

        const updatedItem: CartItem = {
            ...item,
            selectedColor,
            activeColor,
            price: selectedVariation
                ? parseFloat(selectedVariation.price.toFixed(2))
                : parseFloat(price.toFixed(2)), // Ensure price is valid
            quantity: 1,
        };

        // Check if the item already exists in the cart
        const existingItem = cartState.cartArray.find(
            (cartItem) =>
                cartItem.id === item.id && cartItem.selectedColor === selectedColor
        );

        if (existingItem) {
            // Update the quantity and price if the item exists
            const newQuantity = existingItem.quantity + 1;
            updateCart(item.id, newQuantity, selectedColor, updatedItem.price);
        } else {
            // Add a new item to the cart
            dispatch({ type: 'ADD_TO_CART', payload: updatedItem });
        }
    };

    const removeFromCart = (itemId: string, selectedColor: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { itemId, selectedColor } });
    };

    const updateCart = (itemId: string, quantity: number, selectedColor: string, price: number) => {
        dispatch({
            type: 'UPDATE_CART',
            payload: { itemId, quantity, selectedColor, price: parseFloat(price.toFixed(2)) },
        });
    };

    return (
        <CartContext.Provider value={{ cartState, addToCart, removeFromCart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
