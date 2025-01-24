'use client';

import React, { useEffect, useState } from "react";
import { useProduct } from "@/app/context/ProductContext";
import { ClipLoader } from "react-spinners";
import { useParams } from "next/navigation";
import Filter from "@/app/components/Filter";

export default function CategoryPage() {
        const params = useParams();
        const category_id = params.category_id; // Może być "all" lub konkretne ID

        const { products, loading, error, selectCategory, fetchProducts } = useProduct();
        const [filters, setFilters] = useState({});
        const [selectedFilters, setSelectedFilters] = useState({
                minPrice: "",
                maxPrice: "",
                customFilters: {},
        });

        // Ustaw kategorię tylko, gdy category_id się zmieni
        useEffect(() => {
                if (category_id === "all") {
                        selectCategory(null); // Wszystkie produkty (brak kategorii)
                } else {
                        selectCategory(category_id); // Produkty z wybranej kategorii
                }
        }, [category_id]);

        // Budowanie dynamicznych filtrów na podstawie produktów
        useEffect(() => {
                if (products.length > 0) {
                        const allFilters = products.reduce((acc, product) => {
                                Object.keys(product.filters || {}).forEach((key) => {
                                        if (!acc[key]) {
                                                acc[key] = new Set();
                                        }
                                        acc[key].add(product.filters[key]);
                                });
                                return acc;
                        }, {});

                        setFilters(
                            Object.entries(allFilters).reduce((acc, [key, values]) => {
                                    acc[key] = Array.from(values);
                                    return acc;
                            }, {})
                        );
                }
        }, [products]);

        // Obsługa zmiany filtrów
        const handleFilterChange = (newFilters) => {
                // Czyszczenie `customFilters` z pustych wartości
                const cleanedCustomFilters = Object.fromEntries(
                    Object.entries(newFilters.customFilters).map(([key, values]) => [
                            key,
                            values.filter((val) => val !== ""), // Usuwanie pustych wartości
                    ])
                );

                // Usuwanie pustych filtrów z `customFilters`
                const nonEmptyCustomFilters = Object.fromEntries(
                    Object.entries(cleanedCustomFilters).filter(([_, values]) => values.length > 0) // Usuwanie pustych tablic
                );

                // Aktualizacja stanu `selectedFilters`
                setSelectedFilters((prev) => ({ ...prev, ...newFilters }));

                // Budowanie `queryParams`
                const queryParams = {
                        category_id: category_id === "all" ? undefined : category_id, // Ustawienie kategorii, jeśli istnieje
                        minPrice: newFilters.minPrice || undefined,
                        maxPrice: newFilters.maxPrice || undefined,
                        ...nonEmptyCustomFilters, // Dodanie tylko niepustych `customFilters`
                };

                // Usuwanie pustych wartości z `queryParams`
                const filteredQueryParams = Object.fromEntries(
                    Object.entries(queryParams).filter(([_, value]) => value !== undefined && value !== "")
                );

                // Wywołanie odpowiedniego fetchProducts w zależności od aktywnych filtrów
                if (Object.keys(filteredQueryParams).length === 0) {
                        // Brak aktywnych filtrów
                        if (category_id === "all" || !category_id) {
                                selectCategory(null); // Wszystkie produkty
                        } else {
                                selectCategory(category_id); // Produkty dla konkretnej kategorii
                        }
                } else {
                        // Aktywne filtry
                        fetchProducts(filteredQueryParams);
                }
        };

        if (loading) {
                return (
                    <div className="flex justify-center items-center min-h-screen">
                            <ClipLoader color="#2b2d30" size={50} />
                    </div>
                );
        }

        if (error) {
                return <div className="text-red-400">{error.message}</div>;
        }

        return (
            <div className="flex">
                    <aside className="w-1/4 p-4 bg-gray-100 dark:bg-gray-800">
                            <Filter
                                filters={filters}
                                selectedFilters={selectedFilters}
                                onFilterChange={handleFilterChange}
                            />
                    </aside>

                    <section className="w-3/4 p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {products.map((product) => (
                                        <div key={product.id} className="border p-4 rounded shadow">
                                                <h2 className="text-lg font-bold">{product.name}</h2>
                                                <p>{product.description}</p>
                                                <p className="text-gray-500">Cena: {product.price} PLN</p>
                                                <ul className="mt-2">
                                                        <h3 className="text-sm font-semibold mb-2">Filtry:</h3>
                                                        {product.filters &&
                                                            Object.entries(product.filters).map(([key, value]) => (
                                                                <li key={key} className="text-sm text-gray-700">
                                                                        <span className="font-medium">{key}:</span> {value}
                                                                </li>
                                                            ))}
                                                </ul>
                                        </div>
                                    ))}
                            </div>
                    </section>
            </div>
        );
}
