'use client';

import React from 'react';
import { useCategory } from '@/app/context/CategoryContext';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    const { categories } = useCategory();

    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
                <div className="mb-6 md:mb-0">
                    <h3 className="text-lg font-bold mb-4">Kategorie</h3>
                    <ul className="space-y-2">
                        {categories?.map((category) => (
                            <li key={category.id} className="hover:underline cursor-pointer">
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mb-6 md:mb-0">
                    <h3 className="text-lg font-bold mb-4">Szybkie linki</h3>
                    <ul className="space-y-2">
                        <li className="hover:underline cursor-pointer">Zwroty</li>
                        <li className="hover:underline cursor-pointer">Promocje</li>
                        <li className="hover:underline cursor-pointer">Kontakt</li>
                        <li className="hover:underline cursor-pointer">Support</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">Kontakt</h3>
                    <p className="text-sm">E-mail: support@computex.com</p>
                    <p className="text-sm">Telefon: +48 123 456 789</p>
                    <div className="flex space-x-4 mt-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <FaGithub size={24} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <FaLinkedin size={24} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white"
                        >
                            <FaTwitter size={24} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
                © {new Date().getFullYear()} Computex. Wszelkie prawa zastrzeżone.
            </div>
        </footer>
    );
}
