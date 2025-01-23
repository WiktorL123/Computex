'use client';

import Image from 'next/image';
import ThemeSwitcher from '@/app/components/ThemeSwitcher';
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/solid';
import SearchInput from '@/app/components/SearchInput';
import ProfileButton from "@/app/components/ProfileButton";

export default function Header() {
    const aaa = '';
    const amount = 10;

    return (
        <header className="bg-white dark:bg-dark px-4 py-2 m-0">
            {/* Pasek dla dużych ekranów */}
            <div className="hidden xs:flex flex-row justify-between items-center py-2">
                <div className="relative w-[100px] h-[100px] flex-shrink-0">
                    <Image
                        src={'/logo_computex.png'}
                        alt={'logo_computex'}
                        layout={'fill'}
                        objectFit={'contain'}
                    />
                </div>
                <SearchInput className="w-2/3 flex flex-row3" placeholder="Wyszukaj produkt" />
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
                        onClick={() => alert("Przekierowanie do profilu użytkownika")}
                    />
                    <span className={'text-sm w-12'}>Witaj {aaa ? aaa : 'Zaloguj się'}</span>
                    <ThemeSwitcher
                        className="flex flex-row justify-end"
                    />
                </div>
            </div>

            <div className="flex flex-col xs:hidden">
                <div className="flex flex-row justify-between items-center">
                    <div className="relative w-[100px] h-[100px] flex-shrink-0">
                        <Image
                            src={'/logo_computex.png'}
                            alt={'logo_computex'}
                            layout={'fill'}
                            objectFit={'contain'}
                        />
                    </div>
                    <div className="flex flex-row items-center space-x-4 ">
                        <div className="relative flex flex-row justify-around  ">
                            <ShoppingCartIcon className="h-6 w-6 text-gray-900 dark:text-white" />
                            <span
                                className="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                            >
                                {amount}
                            </span>
                        </div>
                        <ProfileButton onClick={() => alert("Przekierowanie do profilu użytkownika")} />

                        <span>Witaj {aaa ? aaa : 'Zaloguj się'}</span>
                        <ThemeSwitcher />
                    </div>
                </div>
                <SearchInput className="mt-4 w-full flex flex-row" placeholder="Wyszukaj produkt" />
            </div>
        </header>
    );
}
