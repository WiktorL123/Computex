'use client'

import React, {useState, useEffect} from "react";
import Input from "@/app/components/Input";
export default function ThemeSwitcher() {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
    })

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
    }

    return (
        <div className={'w-full p-0'}>
            <label className="relative inline-flex items-center cursor-pointer w-full">
                <Input
                type={'checkbox'}
                checked={theme === "light"}
                onChange={toggleTheme}
                className="sr-only peer w-full"
                />

                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

            </label>
        </div>
    );
}