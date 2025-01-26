'use client'
import React, {useEffect, useState, createContext, useContext} from "react";
import {useRouter} from "next/navigation";
const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {})

    const saveUserInLocalStorage = (token, name) => {
            localStorage.setItem('token', token);
            localStorage.setItem('email', name);
    }

    const login = async (email, password) => {
        setLoading(true);
        try {
            const resposne = await fetch('http://localhost:4002/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            } )

            if (!resposne.ok){
                throw new Error(data.message ||'Unable to login');
            }
            const userData = await resposne.json();
            saveUserInLocalStorage(userData.token, userData.name);
            console.log('token w login', userData.token);
            setUser(userData);
            setTimeout(()=>{ router.push('/')}, 3000)

        }
        catch(error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        try {

           const token = localStorage.getItem('token')
            console.log('token w logout ', token);
            const response = await fetch('http://localhost:4002/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token} `
                },
            })
            if (!response.ok){
                throw new Error('Unable to logout');
            }

            localStorage.removeItem('token');
            localStorage.removeItem('name');
            setUser(null);
            setTimeout(()=>{ router.push('/')}, 1500)
        }
        catch (error) {
                setError(error);
        }

    }

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                login,
                logout
            }}
        >
            {children}
        </UserContext.Provider>
    )

}

export const useUser = () => useContext(UserContext);