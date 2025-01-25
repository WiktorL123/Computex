'use client';

import React, { useEffect, useState } from "react";
import { useProduct } from "@/app/context/ProductContext";
import { ClipLoader } from "react-spinners";
import { useParams } from "next/navigation";
import Filter from "@/app/components/Filter";
import Product from "@/app/components/Product";
import {useRouter} from "next/navigation";

export default function CategoryPage() {
        const router = useRouter();
        const params = useParams();
        const category_id = params.category_id; // Może być "all" lub konkretne ID

        const { products, loading, error, selectCategory, fetchProducts } = useProduct();
        const [filters, setFilters] = useState({});
        const [selectedFilters, setSelectedFilters] = useState({
                minPrice: "",
                maxPrice: "",
                customFilters: {},
        });




        useEffect(() => {
                if (category_id === "all") {
                        selectCategory(null);
                } else {
                        selectCategory(category_id);
                }
        }, [category_id]);

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

                const cleanedCustomFilters = Object.fromEntries(
                    Object.entries(newFilters.customFilters).map(([key, values]) => [
                            key,
                            values.filter((val) => val !== ""),
                    ])
                );


                const nonEmptyCustomFilters = Object.fromEntries(
                    Object.entries(cleanedCustomFilters).filter(([_, values]) => values.length > 0)
                );


                setSelectedFilters((prev) => ({ ...prev, ...newFilters }));

                const queryParams = {
                        category_id: category_id === "all" ? undefined : category_id,
                        minPrice: newFilters.minPrice || undefined,
                        maxPrice: newFilters.maxPrice || undefined,
                        ...nonEmptyCustomFilters,
                };


                const filteredQueryParams = Object.fromEntries(
                    Object.entries(queryParams).filter(([_, value]) => value !== undefined && value !== "")
                );


                if (Object.keys(filteredQueryParams).length === 0) {

                        if (category_id === "all" || !category_id) {
                                selectCategory(null);
                        } else {
                                selectCategory(category_id);
                        }
                } else {

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
                    <aside className="w-1/4 p-4 bg-white dark:bg-dark">
                            <Filter
                                className="w-1/4"
                                filters={filters}
                                selectedFilters={selectedFilters}
                                onFilterChange={handleFilterChange}
                            />
                    </aside>

                    <section className="w-3/4 p-4">
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                                    {products.map((product) => (
                                        <div
                                            key={product.id}
                                            onClick={() => router.push(`/products/${product.id}`)}
                                        >

                                                <Product product={product}/>
                                        </div>
                                    ))}

                            </div>

                    </section>
            </div>
        );
}
