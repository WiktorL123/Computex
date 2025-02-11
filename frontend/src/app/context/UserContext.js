'use client';
import React, { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState(null);

    const router = useRouter();

    const mergeOfflineCartWithBackend = async () => {
        if (typeof window === 'undefined') return;
        const guestCart = localStorage.getItem('guest_cart');
        if (!guestCart) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Brak tokena. Zaloguj się ponownie.');

            const parsedCart = JSON.parse(guestCart);
            for (const item of parsedCart) {
                await fetch('http://localhost:4002/api/cart/items', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ product_id: item.productId, quantity: item.quantity }),
                });
            }

            localStorage.removeItem('guest_cart');
            toast.success('Koszyk został scalony z kontem.');
        } catch (error) {
            toast.error(`Błąd podczas scalania koszyka: ${error.message}`);
        }
    };    const saveUserInLocalStorage = (token, name) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
            localStorage.setItem('email', name);
        }
    };
    const login = async (email, password, redirect = '/') => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:4002/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Błąd logowania: ${errorData.message}`);
                return;
            }

            const userData = await response.json();
            saveUserInLocalStorage(userData.token, userData.name);
            setUser(userData)
            console.log('userData', userData);

            await mergeOfflineCartWithBackend();

            toast.success('Logowanie udane!');
            router.push(redirect);
        } catch (error) {
            toast.error('Nie udało się zalogować. Spróbuj ponownie.');
        } finally {
            setLoading(false);
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
                return;
            }

            toast.success('Rejestracja zakończona sukcesem!');
            setTimeout(() => router.push('/auth/login'), 1500);
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error(`Nie udało się zarejestrować. ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchProfile = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Brak tokena. Zaloguj się ponownie.');
            }

            const response = await fetch('http://localhost:4002/api/users/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Nie udało się pobrać danych profilu.');
            }

            const data = await response.json();

            if (!data.firstName || !data.lastName || !data.email) {
                throw new Error('Niekompletne dane profilu.');
            }

            setUser(data);
            console.log('userProfileData', data);

            toast.success('Profil załadowany pomyślnie!');
        } catch (error) {
            toast.error(`Błąd: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (profileData) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Dostęp zabroniony');
            console.log('profileData', profileData);

            const response = await fetch('http://localhost:4002/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(profileData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Nie udało się zaktualizować danych profilu.');
            }

            const updatedUserData = await response.json();
            console.log('Otrzymane dane z API:', updatedUserData);

            // 🔥 Poprawne aktualizowanie `user`
            setUser((prevUser) => {
                const newUser = {
                    ...prevUser,
                    ...updatedUserData.user, // Bierzemy tylko właściwe dane użytkownika
                };
                console.log('Nowy user:', newUser);
                return newUser;
            });

            toast.success('Profil zaktualizowany pomyślnie!');
        } catch (error) {
            toast.error(`Błąd: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const deleteProfile = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token)   throw new Error('Dostęp zabroniony')
            const response = await fetch('http://localhost:4002/api/users/profile', {
                method: 'DELETE',
                headers: {'Authorization': `Bearer ${token}`},
            })
            if (!response.ok) throw new Error('Nie udało się usunąć profilu')
            toast.success('Profil usunięty!')
            logout()
        }
        catch (e){
            toast.error(`Błąd podczas usuwania profilu: ${e.message}`);
        }
        finally {
            setLoading(false);
        }
    }

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
                    setOrders([]);
                    return;
                }
                throw new Error(errorData.message || 'Nie udało się pobrać zamówień.');
            }
            setLoading(false);
            const data = await response.json();
            console.log('orders', data);
            setOrders(data.orders);
        } catch (error) {
            toast.error(`Błąd podczas pobierania zamówień: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

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
            console.log(error.message);
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
    }

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
    }

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

    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                register,
                fetchProfile,
                updateProfile,
                deleteAddress,
                deleteProfile,
                fetchOrders,
                fetchAddresses,
                addAddress,
                updateAddress,
                orders,
                addresses,

            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
