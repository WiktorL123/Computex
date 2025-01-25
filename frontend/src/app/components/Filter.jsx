'use client'
import React, { useState, useCallback } from "react";

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export default function Filter({ filters, selectedFilters, onFilterChange }) {
    const [priceRange, setPriceRange] = useState({
        minPrice: selectedFilters.minPrice || 0,
        maxPrice: selectedFilters.maxPrice || 1000,
    });

    // Debounced handler for price changes
    const debouncedPriceChange = useCallback(
        debounce((updatedRange) => {
            onFilterChange({
                ...selectedFilters,
                minPrice: updatedRange.minPrice,
                maxPrice: updatedRange.maxPrice,
            });
        }, 300),
        [selectedFilters, onFilterChange]
    );

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const updatedRange = {
            ...priceRange,
            [name]: value,
        };
        setPriceRange(updatedRange);
        debouncedPriceChange(updatedRange); // Debounced fetch for price range
    };

    return (
        <div className="bg-white dark:bg-dark p-4 w-full">
            <h3 className="text-lg font-semibold mb-4 text-center">Filtry</h3>

            {/* Dynamic filters */}
            {Object.entries(filters).map(([filterName, options]) => (
                <div key={filterName} className="mb-4">
                    <h4 className="text-sm font-bold w-full">{filterName}</h4>
                    {options.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={`${filterName}-${option}`}
                                name={filterName}
                                value={option}
                                checked={
                                    selectedFilters?.customFilters?.[filterName]?.includes(option) || false
                                }
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    onFilterChange({
                                        customFilters: {
                                            ...selectedFilters.customFilters,
                                            [filterName]: isChecked
                                                ? [
                                                    ...(selectedFilters.customFilters[filterName] || []),
                                                    option,
                                                ]
                                                : selectedFilters.customFilters[filterName]?.filter(
                                                (val) => val !== option
                                            ) || [],
                                        },
                                    });
                                }}
                            />
                            <label htmlFor={`${filterName}-${option}`}>{option}</label>
                        </div>
                    ))}
                </div>
            ))}

            {/* Price Range Sliders */}
            <div className="mb-6">
                <h4 className="text-md font-bold">Cena</h4>
                <div className="flex items-center justify-between">
                    <span>Min: {priceRange.minPrice} PLN</span>
                    <span>Max: {priceRange.maxPrice} PLN</span>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                    <input
                        type="range"
                        name="minPrice"
                        min="0"
                        max="1000"
                        value={priceRange.minPrice}
                        onChange={handlePriceChange}
                        className="w-full"
                    />
                    <input
                        type="range"
                        name="maxPrice"
                        min="0"
                        max="1000"
                        value={priceRange.maxPrice}
                        onChange={handlePriceChange}
                        className="w-full"
                    />
                </div>
            </div>

            {/* Clear Filters Button */}
            <div className="text-center mt-6">
                <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded mx-auto"
                    onClick={() => {
                        setPriceRange({ minPrice: 0, maxPrice: 1000 });
                        onFilterChange({
                            minPrice: "",
                            maxPrice: "",
                            customFilters: {},
                        });
                    }}
                >
                    Wyczyść filtry
                </button>
            </div>
        </div>
    );
}
