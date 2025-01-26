import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filters, setFilters] = useState({});

    const fetchProducts = async (queryParams = {}) => {
        setLoading(true);
        try {
            const cleanQueryParams = Object.fromEntries(
                Object.entries(queryParams).filter(([_, value]) => value !== undefined && value !== null)
            );

            const hasQueryParams = Object.keys(cleanQueryParams).length > 0;
            const queryString = hasQueryParams
                ? `/search?${new URLSearchParams(cleanQueryParams).toString()}`
                : "";

            const url = `http://localhost:4002/api/products${queryString}`;

            console.log("Request URL:", url);
            console.log("Clean Query Params:", cleanQueryParams);

            const response = await fetch(url, { method: "GET" });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch products");
            }

            const formattedProducts = data.products.map((product) => ({
                id: product._id,
                name: product.name,
                description: product.description,
                image: product.images?.[0] || "",
                price: product.price,
                stock: product.stock,
                category: product.category_id?.name || "Brak kategorii",
                filters: product.filters || {},
            }));

            setProducts(formattedProducts);
        } catch (e) {
            setError(e);
            console.error("Fetch error:", e.message);
        } finally {
            setLoading(false);
        }
    };
    const searchProducts = async (searchTerm) => {
        setLoading(true);
        setError(null);
        try {
            const queryParams = {
                query: searchTerm,
            };

            const url = `http://localhost:4002/api/products/search?${new URLSearchParams(queryParams)}`;
            const response = await fetch(url, { method: "GET" });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch products");
            }

            const formattedProducts = data.products.map((product) => ({
                id: product._id,
                name: product.name,
                description: product.description,
                image: product.images?.[0] || "",
                price: product.price,
                stock: product.stock,
                category: product.category_id?.name || "Brak kategorii",
                filters: product.filters || {},
            }));

            setProducts(formattedProducts);
        } catch (e) {
            setError(e);
            console.error("Search error:", e.message);
        } finally {
            setLoading(false);
        }
    };
    const fetchProductById = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4002/api/products/${id}`);
            if (!response.ok) {
                throw new Error(data.message || "No product with id "+ id);
            }
            const data = await response.json();
            setProduct(data)

        }
        catch (error) {
            setError(error);
        }
        finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        const queryParams = {
            category_id: selectedCategory || undefined,
            ...filters
        }
        fetchProducts(queryParams);
    }, [selectedCategory, filters]);

    const selectCategory = (category_id) => {
        if (category_id && typeof category_id !== "string" && category_id !== "all") {
            console.error("Invalid category_id:", category_id);
            return;
        }
        setSelectedCategory(category_id === "all" ? null : category_id);
    };


    const updateFilters = (newFilters) => {
        setFilters(prev=>({
            ...prev,
            ...newFilters,
        }));
    }


    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                error,
                selectCategory,
                updateFilters,
                fetchProducts,
                setError,
                setLoading,
                searchProducts,
                fetchProductById,
                product,
                setProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => useContext(ProductContext);
