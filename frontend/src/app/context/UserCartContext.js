'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { toast } from 'react-toastify';

const UserCartContext = createContext();

export const UserCartProvider = ({ children }) => {
    const [userCart, setUserCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchUserCart = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4002/api/cart', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Nie udało się pobrać koszyka');
            }

            const data = await response.json();

            setUserCart(data.products.map(item => ({
                productId: item.product._id,
                product: item.product,
                quantity: item.quantity,
                price: item.price,
            })));
            setTotalPrice(data.totalPrice);
        } catch (error) {
            toast.error(`Błąd podczas pobierania koszyka: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const addToUserCart = async (productId, quantity) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4002/api/cart/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ product_id: productId, quantity }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Nie udało się dodać produktu do koszyka');
            }

            toast.success('Produkt dodany do koszyka');
            fetchUserCart();
        } catch (error) {
            toast.error(`Błąd podczas dodawania do koszyka: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const removeFromUserCart = async (productId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4002/api/cart/items', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ product_id: productId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Nie udało się usunąć produktu z koszyka');
            }

            toast.success('Produkt usunięty z koszyka');
            fetchUserCart();
        } catch (error) {
            toast.error(`Błąd podczas usuwania z koszyka: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const clearUserCart = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4002/api/cart', {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Nie udało się wyczyścić koszyka');
            }

            toast.success('Koszyk wyczyszczony');
            setUserCart([]);
            setTotalPrice(0);
        } catch (error) {
            toast.error(`Błąd podczas czyszczenia koszyka: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserCartContext.Provider
            value={{
                userCart,
                totalPrice,
                fetchUserCart,
                addToUserCart,
                removeFromUserCart,
                clearUserCart,
                loading,
            }}
        >
            {children}
        </UserCartContext.Provider>
    );
};

export const useUserCart = () => useContext(UserCartContext);
