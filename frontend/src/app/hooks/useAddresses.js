'use client';

import {useEffect, useState} from 'react';
import { toast } from 'react-toastify';

export const useAddresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const  handleError = (status, errorData) => {
        switch(status) {
            case 400:
                toast.error(`Nieprawidlowe dane: ${errorData.error}`);
                break
            case 403:
                console.log(`Brak autoryzacji: ${errorData.error}`);
                break
            default:
                console.log(`Coś poszło nie tak:${errorData.error}`);
        }
    }

    const fetchAddresses = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4002/api/users/addresses', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                handleError(response.status, errorData);
                return
            }
            const data = await response.json();
            setAddresses(data.addresses || []);
        } catch (error) {
            console.error(error.message);
            toast.error(`${error.message}`);
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

            if (!response.ok) {
                const errorData = await response.json(); // Pobierz dane błędu
                handleError(response.status, errorData); // Obsłuż błąd za pomocą handleError
                return; // Zakończ funkcję po obsłużeniu błędu
            }

            // Jeżeli wszystko poszło dobrze:
            const data = await response.json(); // Pobierz dane odpowiedzi
            toast.success('Adres został dodany');
            fetchAddresses(); // Odśwież listę adresów
        } catch (error) {

            toast.error(`Błąd podczas dodawania adresu: ${error.message}`);
        } finally {
            setLoading(false); // Zawsze ustaw `loading` na false
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
