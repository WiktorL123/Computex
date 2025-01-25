'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ThemeSwitcher from '@/app/components/ThemeSwitcher';

export default function AuthHeader() {
    const router = useRouter();

    return (
        <header className="bg-white dark:bg-dark px-4 py-2 m-0 ">
            <div className="flex flex-row justify-around items-center">
                <button
                    className="relative w-[100px] h-[100px] flex-shrink-0"
                    onClick={() => router.push('/')}
                >
                    <Image
                        src={'/logo_computex.png'}
                        alt={'logo_computex'}
                        layout={'fill'}
                        objectFit={'contain'}
                    />
                </button>

                {/* ThemeSwitcher */}
                <ThemeSwitcher />
            </div>
        </header>
    );
}
