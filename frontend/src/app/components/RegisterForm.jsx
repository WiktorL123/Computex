'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useUser } from '@/app/context/UserContext';

export default function RegisterForm() {
    const { register, loading } = useUser();
    const [showAddressFields, setShowAddressFields] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            second_name: '',
            email: '',
            password: '',
            street: '',
            city: '',
            country: '',
            zip_code: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Imię jest wymagane'),
            second_name: Yup.string().required('Nazwisko jest wymagane'),
            email: Yup.string().email('Nieprawidłowy adres email').required('Email jest wymagany'),
            password: Yup.string()
                .min(8, 'Hasło musi mieć co najmniej 8 znaków')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                    'Hasło musi zawierać co najmniej jedną dużą literę, jedną małą literę, cyfrę i znak specjalny'
                )
                .required('Hasło jest wymagane'),
        }),
        onSubmit: (values) => {
            const { name, second_name, email, password, street, city, country, zip_code } = values;
            const userData = {
                name,
                second_name,
                email,
                password,
                addresses: street || city || country || zip_code
                    ? [{ street, city, country, zip_code }]
                    : [], // Jeśli pola adresu są puste, ustaw pustą tablicę
            };
            register(userData);
        },
    });

    const checkShowAddressFields = () => {
        if (
            formik.values.name &&
            formik.values.second_name &&
            formik.values.email &&
            formik.values.password
        ) {
            setShowAddressFields(true);
        }
    };

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="space-y-4 bg-white dark:bg-dark p-6 rounded-lg shadow-md"
            onChange={checkShowAddressFields}
        >
            <h2 className="text-xl font-bold bg-white dark:bg-dark text-dark dark:text-white">
                Rejestracja
            </h2>

            {/* Personal Information Fields */}
            <div>
                <label className="block text-sm font-medium text-gray-300" htmlFor="name">
                    Imię
                </label>
                <input
                    type="text"
                    id="name"
                    {...formik.getFieldProps('name')}
                    className={`w-full mt-1 p-2 border rounded-md shadow-sm bg-gray-700 text-white ${
                        formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Wprowadź imię"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300" htmlFor="second_name">
                    Nazwisko
                </label>
                <input
                    type="text"
                    id="second_name"
                    {...formik.getFieldProps('second_name')}
                    className={`w-full mt-1 p-2 border rounded-md shadow-sm bg-gray-700 text-white ${
                        formik.touched.second_name && formik.errors.second_name
                            ? 'border-red-500'
                            : 'border-gray-600'
                    }`}
                    placeholder="Wprowadź nazwisko"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    {...formik.getFieldProps('email')}
                    className={`w-full mt-1 p-2 border rounded-md shadow-sm bg-gray-700 text-white ${
                        formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Wprowadź email"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300" htmlFor="password">
                    Hasło
                </label>
                <input
                    type="password"
                    id="password"
                    {...formik.getFieldProps('password')}
                    className={`w-full mt-1 p-2 border rounded-md shadow-sm bg-gray-700 text-white ${
                        formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Wprowadź hasło"
                />
            </div>

            {/* Address Fields */}
            {showAddressFields && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="street">
                            Ulica
                        </label>
                        <input
                            type="text"
                            id="street"
                            {...formik.getFieldProps('street')}
                            className="w-full mt-1 p-2 border rounded-md shadow-sm bg-gray-700 text-white"
                            placeholder="Wprowadź ulicę"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="city">
                            Miasto
                        </label>
                        <input
                            type="text"
                            id="city"
                            {...formik.getFieldProps('city')}
                            className="w-full mt-1 p-2 border rounded-md shadow-sm bg-gray-700 text-white"
                            placeholder="Wprowadź miasto"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="country">
                            Kraj
                        </label>
                        <input
                            type="text"
                            id="country"
                            {...formik.getFieldProps('country')}
                            className="w-full mt-1 p-2 border rounded-md shadow-sm bg-gray-700 text-white"
                            placeholder="Wprowadź kraj"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="zip_code">
                            Kod pocztowy
                        </label>
                        <input
                            type="text"
                            id="zip_code"
                            {...formik.getFieldProps('zip_code')}
                            className="w-full mt-1 p-2 border rounded-md shadow-sm bg-gray-700 text-white"
                            placeholder="Wprowadź kod pocztowy"
                        />
                    </div>
                </>
            )}

            <button
                type="submit"
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
            >
                {loading ? 'Rejestracja...' : 'Zarejestruj się'}
            </button>
        </form>
    );
}
