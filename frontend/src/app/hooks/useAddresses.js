'use client';

import {useEffect, useState} from 'react';
import { toast } from 'react-toastify';

export const useAddresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAddresses = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4002/api/users/addresses', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) throw new Error('Nie udało się pobrać adresów');
            const data = await response.json();
            setAddresses(data.addresses || []);
        } catch (error) {
            console.error(error.message);
            toast.error(`Błąd podczas pobierania adresów ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const addAddress = async (address) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4002/api/users/addresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(address),
            });

            if (!response.ok) throw new Error('Nie udało się dodać adresu');
            toast.success('Adres został dodany');
            fetchAddresses();
        } catch (error) {
            toast.error(`Błąd podczas dodawania adresu ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const updateAddress = async (updateData, addressId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4002/api/users/addresses/${addressId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) throw new Error('Nie udało się zaktualizować adresu');
            toast.success('Adres został zaktualizowany');
            fetchAddresses();
        } catch (error) {
            toast.error('Błąd podczas aktualizacji adresu');
        } finally {
            setLoading(false);
        }
    };

    const deleteAddress = async (addressId) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:4002/api/users/addresses/${addressId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) throw new Error('Nie udało się usunąć adresu');
            toast.success('Adres został usunięty');
            fetchAddresses();
        } catch (error) {
            toast.error('Błąd podczas usuwania adresu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [])

    return {
        addresses,
        loading,
        fetchAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setLoading,
        setAddresses,
    };
};
