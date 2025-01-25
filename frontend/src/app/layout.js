'use client';

import { useState } from "react";
import { usePathname } from "next/navigation"; // Import `usePathname`
import "./globals.css";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import { CategoryProvider } from "@/app/context/CategoryContext";
import { ProductProvider } from "@/app/context/ProductContext";

export default function RootLayout({ children }) {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const pathname = usePathname(); // Pobierz aktualną ścieżkę

    const toggleNavbar = () => setIsNavbarOpen((prev) => !prev);

    // Sprawdź, czy aktualna ścieżka należy do `auth`
    const isAuthPage = pathname.startsWith("/auth");

    return (
        <html lang="en">
        <body className="bg-white dark:bg-dark">
        <CategoryProvider>
            <ProductProvider>
                {/* Renderuj Header i Navbar tylko na nie-auth ścieżkach */}
                {!isAuthPage && (
                    <>
                        <Header toggleNavbar={toggleNavbar} isNavbarOpen={isNavbarOpen} />
                        <div className="hidden xs:flex text-xs xs:text-xs s:text-sm">
                            <Navbar isOpen={true} />
                        </div>
                        <div className="xs:hidden">
                            <Navbar isOpen={isNavbarOpen} />
                        </div>
                    </>
                )}

                <main>{children}</main>
            </ProductProvider>
        </CategoryProvider>
        </body>
        </html>
    );
}
