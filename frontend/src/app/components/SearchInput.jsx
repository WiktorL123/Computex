import React, {useState, useCallback, useRef, useLayoutEffect, useEffect} from "react";
import { SearchIcon } from "@heroicons/react/solid";
import "../globals.css";
import {useRouter} from "next/navigation";
import { useProduct } from "@/app/context/ProductContext";


function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export default function SearchInput({ className, placeholder }) {


    const router = useRouter();
    const { loading, setLoading, error, setError } = useProduct();
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    const fetchSuggestions = async (searchTerm) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                `http://localhost:4002/api/products/suggestions?query=${encodeURIComponent(
                    searchTerm
                )}`
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch suggestions");
            }
            setSuggestions(data);
        } catch (error) {
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (!value.trim()) {
            setIsDropdownOpen(false);
            setSuggestions([]);
            return;
        }

        setIsDropdownOpen(true);
        fetchSuggestionsDebounced(value);
    };

    const fetchSuggestionsDebounced = useCallback(
        debounce((searchTerm) => {
            fetchSuggestions(searchTerm);
        }, 300),
        []
    );

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setIsDropdownOpen(false);
        router.push(`/products/${suggestion.id}`);
    };

    const handleSearch = () =>{
        if (!query.trim()) return
        console.log(query)
        router.push(`/search?query=${encodeURIComponent(query)}`);
    }


    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <div className={`relative flex flex-row items-center space-x-2 ${className}`}>
            <input
                type={"text"}
                value={query}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
            />
            <button
                onClick={handleSearch}
                className="m-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 focus:outline-none focus:shadow-outline button"
            >
                <SearchIcon className="h-6 w-6 m-0" />
            </button>

            {isDropdownOpen && Array.isArray(suggestions) && suggestions.length > 0 && (
                <div
                    className="absolute bg-white dark:bg-dark border border-gray-300 rounded shadow-md mt-2 w-full z-50 top-10 right-0"
                    style={{ zIndex: 50 }}
                >
                    {loading && <div className="p-2">Loading...</div>}
                    {error && <div className="p-2 text-red-500">{error.message}</div>}
                    <ul className="list-none m-0 p-0">
                        {suggestions.map((suggestion) => (
                            <li
                                key={suggestion.id}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
