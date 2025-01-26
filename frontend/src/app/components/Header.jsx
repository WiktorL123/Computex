'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ThemeSwitcher from '@/app/components/ThemeSwitcher';
import { MenuIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/solid';
import SearchInput from '@/app/components/SearchInput';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';
import {useUserCart} from "@/app/context/UserCartContext";
import {useBrowserCart} from "@/app/context/BrowserCartContext";


export default function Header({ toggleNavbar, isNavBarOpen }) {
    const [isDroppedDown, setIsDroppedDown] = useState(false);
    const { logout, user } = useUser();
    const { userCart, fetchUserCart } = useUserCart();
    const { browserCart } = useBrowserCart();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            fetchUserCart();
        }
    }, [user]);

    const toggleDropDown = () => setIsDroppedDown((prev) => !prev);

    const renderDropdownMenu = () => (
        <div className="absolute top-20 right-20 bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 z-50">
            {user ? (
                <ul className="space-y-2">
                    <li>
                        <button
                            className="w-full text-left text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded"
                            onClick={() => router.push(`/profile/${user.userId}`)}
                        >
                            Mój Profil
                        </button>
                    </li>
                    <li>
                        <button
                            className="w-full text-left text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded"
                            onClick={logout}
                        >
                            Wyloguj się
                        </button>
                    </li>
                </ul>
            ) : (
                <ul className="space-y-2">
                    <li>
                        <button
                            className="w-full text-left text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded"
                            onClick={() => router.push('/auth/login')}
                        >
                            Zaloguj
                        </button>
                    </li>
                    <li>
                        <button
                            className="w-full text-left text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded"
                            onClick={() => router.push('/auth/register')}
                        >
                            Zarejestruj
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );

    const cartItemCount = user
        ? userCart.reduce((total, item) => total + item.quantity, 0)
        : browserCart.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="bg-white dark:bg-dark px-4 py-2 m-0">
            <div className="hidden xs:flex flex-row justify-between items-center py-2">
                <button
                    className="relative w-[100px] h-[100px] flex-shrink-0"
                    onClick={() => router.push('/')}
                >
                    <Image
                        src={'/logo_computex.png'}
                        alt="logo_computex"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </button>
                <SearchInput className="w-2/3 flex mx-2" placeholder="Wyszukaj produkt" />
                <div className="flex items-center space-x-4">
                    <button
                        className="relative"
                        onClick={()=>router.push('/cart')}
                    >
                        <ShoppingCartIcon className="h-8 w-8 text-gray-900 dark:text-white" />
                        <span
                            className="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                        >
                            {cartItemCount}
                        </span>
                    </button>
                    <button onClick={toggleDropDown} className="relative">
                        <UserCircleIcon className="h-8 w-8 text-gray-900 dark:text-white" />
                    </button>
                    <span className={'text-sm'}> Witaj {user ? user.name : 'zaloguj się'}</span>
                    <ThemeSwitcher />
                    {isDroppedDown && renderDropdownMenu()}
                </div>
            </div>

            <div className="flex flex-col xs:hidden">
                <div className="flex justify-between items-center">
                    <button
                        className="relative w-[100px] h-[100px] flex-shrink-0"
                        onClick={() => router.push('/')}
                    >
                        <Image
                            src={'/logo_computex.png'}
                            alt="logo_computex"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </button>
                    <div className="flex items-center space-x-4">
                        <button
                            className="relative flex items-center justify-around"
                            onClick={()=>router.push('/cart')}
                        >
                            <ShoppingCartIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                            <span
                                className="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                            >
                                {cartItemCount}
                            </span>
                        </button>
                        <button onClick={toggleDropDown}>
                            <UserCircleIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                        </button>
                        <span className={'text-sm'}> Witaj {user ? user.name : 'zaloguj się'}</span>
                        <ThemeSwitcher />
                        <button className="xs:hidden" onClick={toggleNavbar}>
                            <MenuIcon className="w-6 h-6" />
                        </button>
                        {isDroppedDown && renderDropdownMenu()}
                    </div>
                </div>
                <SearchInput className="mt-4 w-full" placeholder="Wyszukaj produkt" />
            </div>
        </header>
    );
}
