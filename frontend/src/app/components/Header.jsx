'use client';


import React, {useState} from 'react';
import Image from 'next/image';
import ThemeSwitcher from '@/app/components/ThemeSwitcher';
import {MenuIcon, ShoppingCartIcon, UserCircleIcon} from '@heroicons/react/solid';
import SearchInput from '@/app/components/SearchInput';
import ProfileButton from "@/app/components/ProfileButton";
import {useRouter} from 'next/navigation';

export default function Header({toggleNavbar, isNavBarOpen}) {
    const [isDroppedDown, setIsDroppedDown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = 'Maniek';
    const amount = 10;

    const router = useRouter();

    const toggleDropDown = () => {
        setIsDroppedDown((prev)=>!prev);
    }


    return (
        <header className="bg-white dark:bg-dark px-4 py-2 m-0">
            <div className="hidden xs:flex flex-row justify-between items-center py-2">
                <button className="relative w-[100px] h-[100px] flex-shrink-0"
                onClick={() =>router.push('/')}>
                    <Image
                        src={'/logo_computex.png'}
                        alt={'logo_computex'}
                        layout={'fill'}
                        objectFit={'contain'}
                    />
                </button>
                <SearchInput className="w-2/3 flex flex-row3 mx-2" placeholder="Wyszukaj produkt" />
                <div className="flex flex-row items-center  space-x-4 flex-shrink-0">
                    <div className="relative">
                        <ShoppingCartIcon className="h-8 w-8 text-gray-900 dark:text-white" />
                        <span
                            className="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                        >
                            {amount}
                        </span>
                    </div>
                    <ProfileButton
                        className="flex flex-row justify-center"
                        onClick={toggleDropDown}
                    />
                    <span className={'text-sm w-12'}>Witaj, {isLoggedIn? user : 'Zaloguj się'}</span>
                    <ThemeSwitcher
                        className="flex flex-row justify-end"
                    />

                    {isDroppedDown && (
                        <div className='xs:absolute top-20 right-20 absolute top-20 right-20 bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 z-50'>
                            {isLoggedIn ? (
                                <ul className='space-y-2'>
                                    <li>
                                        <button
                                            className='w-full text-left text-gray-900 dark:white hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded'
                                        >
                                            Moj Profil

                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className='w-full text-left text-gray-900 dark:white hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded'
                                        >
                                            Wyloguj się

                                        </button>
                                    </li>
                                </ul>
                            ): (
                                <ul className='space-y-2'>
                                    <li>
                                        <button
                                            className='w-full text-left text-gray-900 dark:white hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded'
                                            onClick={()=>router.push('/auth/login')}
                                        >

                                            Zaloguj

                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className='w-full text-left text-gray-900 dark:white hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded'
                                        >

                                            Zarejestruj

                                        </button>
                                    </li>
                                </ul>
                            )}

                        </div>
                    )}

                </div>
            </div>




            <div className="flex flex-col xs:hidden">
                <div className="flex flex-row justify-between items-center">
                    <button className="relative w-[100px] h-[100px] flex-shrink-0"
                        onClick={()=>router.push('/')}>
                        <Image
                            src={'/logo_computex.png'}
                            alt={'logo_computex'}
                            layout={'fill'}
                            objectFit={'contain'}
                        />
                    </button>
                    <div className="flex flex-row items-center space-x-4 ">
                        <div className="relative flex flex-row justify-around  ">
                            <ShoppingCartIcon className="h-6 w-6 text-gray-900 dark:text-white"/>
                            <span
                                className="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                            >
                                {amount}
                            </span>
                        </div>
                        <ProfileButton onClick={toggleDropDown}/>

                        <span className={'text-sm w-12'}>Witaj, {isLoggedIn ? user : 'Zaloguj się'}</span>
                        <ThemeSwitcher/>
                        <div className='flex flex-row items-center space-x-4 relative'>
                            <button
                                className='xs:hidden text-gray-900 dark:text-gray-white'
                                onClick={toggleNavbar}
                            >
                            <MenuIcon className='w-6 h-6'/>
                            </button>
                        </div>
                        {isDroppedDown && (
                            <div className='xs:absolute top-20 right-20 absolute top-20 right-20 bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 z-50'>
                                {isLoggedIn ? (
                                    <ul className='space-y-2'>
                                        <li>
                                            <button
                                                className='w-full text-left text-gray-900 dark:white hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded'
                                            >
                                                Moj Profil

                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className='w-full text-left text-gray-900 dark:white hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded'
                                            >
                                                Wyloguj się

                                            </button>
                                        </li>
                                    </ul>
                                ): (
                                    <ul className='space-y-2'>
                                        <li>
                                            <button
                                                className='w-full text-left text-gray-900 dark:white hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded'
                                            >
                                                Zaloguj

                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className='w-full text-left text-gray-900 dark:white hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 rounded'
                                            >

                                                Zarejestruj

                                            </button>
                                        </li>
                                    </ul>
                                )}

                            </div>
                        )}
                    </div>
                </div>
                <SearchInput className="mt-4 w-full flex flex-row" placeholder="Wyszukaj produkt" />
            </div>
        </header>
    );
}
