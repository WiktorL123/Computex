'use client';

import React, {useState} from 'react';
import { useParams } from 'next/navigation';
import ProfileSection from "@/app/components/ProfileSection";
import OrdersSection from "@/app/components/OrdersSection";
import AddressesSection from "@/app/components/AddressesSection";

export default function UserProfile() {
    const { userId } = useParams();
    const [activeSection, setActiveSection] = useState('profile');


    const handleSectionChange = (section) => {
        setActiveSection(section);
    }

    return (
        <div className=" flex p-8">
            <aside className={'w-1/4 bg-white dark:bg-dark p-4 rounded shadow'}>
                <h2 className='text-lg font-bold text-black dark:text-white'>
                    Panel Użytkownika
                </h2>
                <ul className="space-y-4 mt-4">
                    <li>
                        <button
                            onClick={() => handleSectionChange('orders')}
                            className={`w-full text-left py-2 px-4 rounded ${
                                activeSection === 'orders' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            Moje zamówienia
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleSectionChange('profile')}
                            className={`w-full text-left py-2 px-4 rounded ${
                                activeSection === 'profile' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            Moje dane
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleSectionChange('addresses')}
                            className={`w-full text-left py-2 px-4 rounded ${
                                activeSection === 'addresses' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            Moje adresy
                        </button>
                    </li>
                </ul>
            </aside>

            <main className="flex-1 bg-white dark:bg-gray-900 p-4 rounded shadow">
                {activeSection === 'orders' && (<OrdersSection/>)}
                {activeSection === 'profile' && (<ProfileSection/>)}
                {activeSection === 'addresses' && (<AddressesSection/>)}
            </main>

        </div>
    );
}
