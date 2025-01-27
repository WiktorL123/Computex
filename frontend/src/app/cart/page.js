'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@/app/context/UserContext';
import { useUserCart } from '@/app/context/UserCartContext';
import { useBrowserCart } from '@/app/context/BrowserCartContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function CartPage() {
    const { user } = useUser();
    const { userCart, fetchUserCart, addToUserCart, removeFromUserCart, totalPrice } = useUserCart();
    const { browserCart, addToBrowserCart, removeFromBrowserCart } = useBrowserCart();
    const [cart, setCart] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            fetchUserCart();
        } else {
            setCart(browserCart);
        }
    }, [user, browserCart]);

    const handleQuantityChange = (productId, quantity) => {
        if (user) {
            addToUserCart(productId, quantity);
        } else {
            addToBrowserCart(productId, quantity);
            setCart([...browserCart]);
        }
    };

    const handleRemoveItem = (productId) => {
        if (user) {
            removeFromUserCart(productId);
        } else {
            removeFromBrowserCart(productId);
            setCart([...browserCart]);
        }
    };

    const handlePlaceOrder = () => {
        if (user) {
            router.push('/order')
        } else {
            localStorage.setItem('guest_cart', JSON.stringify(browserCart));
            router.push('/auth/login?redirect=/cart');
        }
    };

    const displayCart = user ? userCart : cart;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Twój koszyk</h1>
            {displayCart.length === 0 ? (
                <p className="text-gray-500">Twój koszyk jest pusty.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {displayCart.map((item) => (
                            <li key={item.productId} className="flex items-center justify-between border p-4 rounded shadow">
                                <div>
                                    <p className="font-semibold">{item.product?.name || 'Produkt nieznany'}</p>
                                    <p className="text-gray-500">Cena: {item.product?.price || 0} PLN</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {/*<select*/}
                                    {/*    value={item.quantity}*/}
                                    {/*    onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value, 10))}*/}
                                    {/*    className="border rounded p-2 text-gray-500"*/}
                                    {/*>*/}
                                    {/*    {[...Array(10).keys()].map((num) => (*/}
                                    {/*        <option key={num + 1} value={num + 1}>*/}
                                    {/*            {num + 1}*/}
                                    {/*        </option>*/}
                                    {/*    ))}*/}
                                    {/*</select>*/}
                                    <button
                                        onClick={() => handleRemoveItem(item.productId)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Usuń
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 flex justify-between items-center">
                        <p className="text-lg font-bold">Łączna cena: {totalPrice.toFixed(2)} PLN</p>
                        <button
                            onClick={handlePlaceOrder}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Złóż zamówienie
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
