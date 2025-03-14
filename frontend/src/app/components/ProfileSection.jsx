'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@/app/context/UserContext';

export default function ProfileSection() {
    const { fetchProfile, updateProfile, deleteProfile, user } = useUser();
    const [formMode, setFormMode] = useState(false);
    const [profileForm, setProfileForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    useEffect(() => {
        if (!user)
            fetchProfile();
    }, []);

    useEffect(() => {
        if (user) {
            setProfileForm({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Wysyłane dane:', profileForm);
        await updateProfile(profileForm);
        setFormMode(false);
    };

    if (!user || !user.firstName) return <p>Ładowanie danych profilu...</p>;

    return (
        <div>
            <h2 className="text-xl font-bold">Moje dane</h2>
            {formMode ? (
                <form
                    onSubmit={handleSubmit}
                    className="mt-6 p-4 border rounded shadow-lg space-y-4 bg-white dark:bg-gray-800 text-black"
                >
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            Imię
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={profileForm.firstName}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Nazwisko
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={profileForm.lastName}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileForm.email}
                            onChange={handleInputChange}
                            className="w-full mt-1 p-2 border rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Zapisz zmiany
                    </button>
                    <button
                        type="button"
                        className="ml-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                        onClick={() => setFormMode(false)}
                    >
                        Anuluj
                    </button>
                </form>
            ) : (
                <div>
                    <p>Imię: {user.firstName}</p>
                    <p>Nazwisko: {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <button
                        onClick={() => setFormMode(true)}
                        className="text-blue-500 hover:underline"
                    >
                        Edytuj
                    </button>
                    <button
                        onClick={deleteProfile}
                        className="text-red-500 hover:underline ml-4"
                    >
                        Usuń profil
                    </button>
                </div>
            )}
        </div>
    );
}
