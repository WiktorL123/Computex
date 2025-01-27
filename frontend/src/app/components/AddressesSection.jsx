'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {useAddresses} from "@/app/hooks/useAddresses";

export default function AddressesSection() {

    const [formMode, setFormMode] = useState('add');
    const [currentAddressId, setCurrentAddressId] = useState(null);
    const [addressForm, setAddressForm] = useState({
        street: '',
        city: '',
        country: '',
        zip_code: '',
    });

    const {fetchAddresses, addAddress, deleteAddress, updateAddress, addresses, setAddresses, setLoading, loading } = useAddresses();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!addressForm.street || !addressForm.city || !addressForm.country || !addressForm.zip_code) {
            alert('Wszystkie pola są wymagane!');
            return;
        }

        if (formMode === 'add') {
            await addAddress(addressForm);
        } else if (formMode === 'edit') {
            await updateAddress(addressForm, currentAddressId);
        }

        setAddressForm({ street: '', city: '', country: '', zip_code: '' });
        setFormMode('add');
        setCurrentAddressId(null);
    };

    const handleEdit = (address) => {
        setFormMode('edit');
        setCurrentAddressId(address._id);
        setAddressForm({
            street: address.street,
            city: address.city,
            country: address.country,
            zip_code: address.zip_code,
        });
    };

    if (loading) return <p>Ładowanie danych...</p>;

    return (
        <div>
            <h2 className="text-xl font-bold">Moje adresy</h2>
            {addresses.length === 0 ? (
                <p className="text-gray-500">Nie masz jeszcze żadnych zapisanych adresów.</p>
            ) : (
                <ul className="space-y-4">
                    {addresses.map((address) => (
                        <li key={address._id} className="border p-4 rounded shadow">
                            <p>Ulica: {address.street}</p>
                            <p>Miasto: {address.city}</p>
                            <p>Kraj: {address.country}</p>
                            <p>Kod pocztowy: {address.zip_code}</p>
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={() => handleEdit(address)}
                            >
                                Edytuj
                            </button>
                            <button
                                className="text-red-500 hover:underline"
                                onClick={() => deleteAddress(address._id)}
                            >
                                Usuń
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <form
                onSubmit={handleSubmit}
                className="mt-6 p-4 border rounded shadow-lg space-y-4 bg-white dark:bg-gray-800 text-gray-500"
            >
                <h3 className="text-lg font-bold">
                    {formMode === 'add' ? 'Dodaj nowy adres' : 'Edytuj adres'}
                </h3>
                <div>
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                        Ulica
                    </label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={addressForm.street}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Miasto
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={addressForm.city}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Kraj
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={addressForm.country}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700">
                        Kod pocztowy
                    </label>
                    <input
                        type="text"
                        id="zip_code"
                        name="zip_code"
                        value={addressForm.zip_code}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    {formMode === 'add' ? 'Dodaj adres' : 'Zapisz zmiany'}
                </button>
                {formMode === 'edit' && (
                    <button
                        type="button"
                        className="ml-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        onClick={() => {
                            setFormMode('add');
                            setAddressForm({ street: '', city: '', country: '', zip_code: '' });
                            setCurrentAddressId(null);
                        }}
                    >
                        Anuluj
                    </button>
                )}
            </form>
        </div>
    );
}
