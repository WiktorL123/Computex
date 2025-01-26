'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@/app/context/UserContext';

export default function OrdersSection() {
    const { user } = useUser();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4002/api/orders/user', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.message === 'No orders found for this user.') {
                    setOrders([]); // Pusta tablica, jeśli nie ma zamówień
                    return;
                }
                throw new Error(errorData.message || 'Nie udało się pobrać zamówień.');
            }

            const data = await response.json();
            console.log('Fetched orders:', data); // Debug
            setOrders(data); // Ustaw dane zamówień
        } catch (error) {
            console.error(`Błąd podczas pobierania zamówień: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (loading) {
        return <p>Ładowanie zamówień...</p>;
    }

    if (!orders || orders.length === 0) {
        return <p className="text-gray-500">Nie masz jeszcze żadnych zamówień.</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold">Moje zamówienia</h2>
            <ul className="space-y-4">
                {orders.map((order) => (
                    <li key={order._id} className="border p-4 rounded shadow">
                        <p>ID zamówienia: {order._id}</p>
                        <p>Data: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Status: {order.status}</p>
                        <p>Kwota: {order.totalPrice} PLN</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
