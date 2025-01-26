'use client';

import { useFormik } from 'formik';
import { useUser } from '@/app/context/UserContext';
import * as Yup from 'yup';

export default function LoginForm({ onRegisterRedirect }) {
    const { login, loading } = useUser();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Nieprawidłowy adres email')
                .required('Email jest wymagany'),
            password: Yup.string()
                .min(8, 'Hasło musi mieć co najmniej 8 znaków')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                    'Hasło musi zawierać co najmniej jedną dużą literę, jedną małą literę, jedną cyfrę oraz jeden znak specjalny (!@#$%^&*)'
                )
                .required('Hasło jest wymagane'),
        }),
        onSubmit: (values) => {
            login(values.email, values.password);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    {...formik.getFieldProps('email')}
                    className="w-full mt-1 p-2 border rounded-md shadow-sm bg-gray-700 text-white"
                    placeholder="Wprowadź email"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Hasło
                </label>
                <input
                    type="password"
                    id="password"
                    {...formik.getFieldProps('password')}
                    className="w-full mt-1 p-2 border rounded-md shadow-sm bg-gray-700 text-white"
                    placeholder="Wprowadź hasło"
                />
            </div>

            <button
                type="submit"
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
            >
                {loading ? 'Logowanie...' : 'Zaloguj się'}
            </button>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                <button
                    type="button"
                    className="hover:text-gray-300"
                    onClick={onRegisterRedirect}
                >
                    Zarejestruj się
                </button>
            </div>
        </form>
    );
}
