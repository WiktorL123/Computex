'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@/app/context/UserContext';
import { useUserCart } from '@/app/context/UserCartContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

export default function OrderSummaryPage() {
    const { user, fetchAddresses, addresses } = useUser();
    const { userCart, totalPrice } = useUserCart();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [orderId, setOrderId] = useState(null); // ID zamówienia po POST
    const router = useRouter();

    useEffect(() => {
        const socket = io('http://localhost:4002');

        socket.on('order-status-update', (data) => {
            if (data && data.orderId === orderId) {
                toast.success(`Status zamówienia zmieniony na: ${data.status}`);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [orderId]);

    useEffect(() => {
        if (user) {
            fetchAddresses();
        } else {
            router.push('/auth/login?redirect=/order');
        }
    }, [user]);

    const handleCreateAndConfirmOrder = async () => {
        if (!selectedAddress) {
            toast.error('Wybierz adres dostawy przed potwierdzeniem zamówienia.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const selectedAddressObject = addresses.find(address => address._id === selectedAddress);

            if (!selectedAddressObject) {
                throw new Error('Nie udało się znaleźć wybranego adresu.');
            }

            // Tworzenie zamówienia
            const response = await fetch('http://localhost:4002/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    shippingAddress: selectedAddressObject,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Nie udało się utworzyć zamówienia.');
            }

            const data = await response.json();
            setOrderId(data.order._id); // Ustawienie ID zamówienia
            toast.success('Zamówienie zostało złożone pomyślnie!');

            // Automatyczna aktualizacja zamówienia
            const confirmResponse = await fetch(`http://localhost:4002/api/orders/${data.order._id}/confirm`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!confirmResponse.ok) {
                const confirmErrorData = await confirmResponse.json();
                throw new Error(confirmErrorData.message || 'Nie udało się potwierdzić zamówienia.');
            }


        } catch (error) {
            toast.error(`Błąd: ${error.message}`);
        }
    };

    if (!user || !userCart.length || !addresses.length) {
        return <p>Ładowanie danych...</p>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Podsumowanie zamówienia</h1>

            <ul className="space-y-4">
                {userCart.map((item) => (
                    <li key={item.product._id} className="flex items-center justify-between border p-4 rounded shadow">
                        <div>
                            <p className="font-semibold">{item.product.name}</p>
                            <p className="text-gray-500">Cena: {item.product.price} PLN</p>
                            <p className="text-gray-500">Ilość: {item.quantity}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-6">
                <p className="text-lg font-bold mb-4">Łączna cena: {totalPrice.toFixed(2)} PLN</p>
                <label htmlFor="address" className="block text-gray-700 mb-2">
                    Wybierz adres dostawy:
                </label>
                <select
                    id="address"
                    value={selectedAddress || ''}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    className="w-full border p-2 rounded mb-4 text-gray-500"
                >
                    <option value="" disabled>-- Wybierz adres --</option>
                    {addresses.map((address) => (
                        <option key={address._id} value={address._id}>
                            {`${address.street}, ${address.city}, ${address.country}, ${address.zip_code}`}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleCreateAndConfirmOrder}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Złóż zamówienie
                </button>
            </div>
        </div>
    );
}
