'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import { CategoryProvider } from "@/app/context/CategoryContext";
import { ProductProvider } from "@/app/context/ProductContext";
import { UserProvider } from "@/app/context/UserContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/app/components/Footer";
import {UserCartProvider} from "@/app/context/UserCartContext";
import {BrowserCartProvider} from "@/app/context/BrowserCartContext";

export default function RootLayout({ children }) {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const pathname = usePathname();

    const toggleNavbar = () => setIsNavbarOpen((prev) => !prev);

    const isAuthPage = pathname.startsWith("/auth");

    return (
        <html lang="en">
        <body className="bg-white dark:bg-dark">
        <CategoryProvider>
            <ProductProvider>
                <UserProvider>
                    <UserCartProvider>
                        <BrowserCartProvider>
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
                            <Footer />
                            <ToastContainer
                                position="top-right"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme={"colored"}
                            />
                        </BrowserCartProvider>
                    </UserCartProvider>
                </UserProvider>
            </ProductProvider>
        </CategoryProvider>
        </body>
        </html>
    );
}
