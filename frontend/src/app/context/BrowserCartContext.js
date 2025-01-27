import React, { useState, useEffect, createContext, useContext } from 'react';
import { toast } from 'react-toastify';

const BrowserCartContext = createContext();

export const BrowserCartProvider = ({ children }) => {
    const [browserCart, setBrowserCart] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('guest_cart');
            return storedCart ? JSON.parse(storedCart) : [];
        }
        return [];
    });

    const calculateTotalPrice = (cart) => {
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const [totalPrice, setTotalPrice] = useState(() => calculateTotalPrice(browserCart));

    useEffect(() => {
        localStorage.setItem('guest_cart', JSON.stringify(browserCart));
        setTotalPrice(calculateTotalPrice(browserCart));
    }, [browserCart]);

    const addToBrowserCart = async (productId, quantity) => {
        const existingProduct = browserCart.find((item) => item.productId === productId);

        if (existingProduct) {
            setBrowserCart((prev) =>
                prev.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            );
        } else {
            try {
                const response = await fetch(`http://localhost:4002/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać szczegółów produktu.');
                }

                const product = await response.json();
                setBrowserCart((prev) => [...prev, { productId, quantity, product }]);
            } catch (error) {
                toast.error(`Błąd podczas dodawania produktu: ${error.message}`);
            }
        }
    };

    const removeFromBrowserCart = (productId) => {
        setBrowserCart((prev) => prev.filter((item) => item.productId !== productId));
    };

    const clearBrowserCart = () => {
        setBrowserCart([]);
    };

    return (
        <BrowserCartContext.Provider
            value={{
                browserCart,
                addToBrowserCart,
                removeFromBrowserCart,
                clearBrowserCart,
                totalPrice,
            }}
        >
            {children}
        </BrowserCartContext.Provider>
    );
};

export const useBrowserCart = () => useContext(BrowserCartContext);
