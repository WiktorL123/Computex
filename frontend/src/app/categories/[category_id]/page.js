'use client';

import React, { useEffect, useState } from "react";
import { useProduct } from "@/app/context/ProductContext";
import { ClipLoader } from "react-spinners";
import { useParams } from "next/navigation";
import Filter from "@/app/components/Filter";

export default function CategoryPage() {
        const params = useParams();
        const category_id = params.category_id; // undefined on Home

        const { products, loading, error, selectCategory, fetchProducts } = useProduct();
        const [filters, setFilters] = useState({});
        const [selectedFilters, setSelectedFilters] = useState({
                minPrice: "",
                maxPrice: "",
                customFilters: {},
        });

        // Wywołanie selectCategory tylko, gdy category_id istnieje
        useEffect(() => {
                if (category_id) {
                        selectCategory(category_id);
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

        const handleFilterChange = (newFilters) => {
                setSelectedFilters((prev) => ({ ...prev, ...newFilters }));
                const queryParams = {
                        category_id,
                        minPrice: newFilters.minPrice,
                        maxPrice: newFilters.maxPrice,
                        ...newFilters.customFilters,
                };
                fetchProducts(queryParams); // Dynamiczne pobieranie z filtrami
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
                    <aside>
                            <Filter
                                filters={filters}
                                selectedFilters={selectedFilters}
                                onFilterChange={handleFilterChange}
                            />
                    </aside>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
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
            </div>
        );
}
