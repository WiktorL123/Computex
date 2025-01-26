'use client';
import React, { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false); // Spinner
    const router = useRouter();

    const saveUserInLocalStorage = (token, name) => {
        localStorage.setItem('token', token);
        localStorage.setItem('email', name);
    };

    const login = async (email, password) => {
        setLoading(true); // Spinner start
        try {
            const response = await fetch('http://localhost:4002/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Błąd logowania: ${errorData.message}`); // Błąd z backendu
                return;
            }

            const userData = await response.json();
            saveUserInLocalStorage(userData.token, userData.name);
            setUser(userData);
            console.log(userData)

            toast.success("Logowanie udane!"); // Sukces
            setTimeout(() => router.push('/'), 3000); // Przekierowanie po 3 sekundach
        } catch (error) {
            toast.error("Nie udało się zalogować. Spróbuj ponownie."); // Błąd z frontendu
        } finally {
            setLoading(false); // Spinner stop
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4002/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Unable to logout');
            }

            localStorage.removeItem('token');
            localStorage.removeItem('name');
            setUser(null);

            toast.success("Wylogowano pomyślnie!");
            setTimeout(() => router.push('/'), 1500);
        } catch (error) {
            toast.error("Wylogowanie nie powiodło się.");
        }
    };

    const register = async ({ name, second_name, email, password, addresses = [] }) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4002/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, second_name, email, password, addresses }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Błąd rejestracji: ${errorData.message || 'Nieznany błąd'}`);
                return; // Zakończ funkcję w przypadku błędu
            }

            toast.success('Rejestracja zakończona sukcesem!');
            setTimeout(() => router.push('/auth/login'), 1500); // Przekierowanie na stronę logowania
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error(`Nie udało się zarejestrować. ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    return (
        <UserContext.Provider
            value={{
                user,
                loading, // Spinner state
                login,
                logout,
                register
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
