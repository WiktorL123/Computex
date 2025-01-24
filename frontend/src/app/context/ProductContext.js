import {createContext, useContext, useState, useEffect} from "react";

const ProductContext = createContext()



export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:4002/api/products/`, {
                    method: 'GET',
                })
                const data = await response.json();
                if (!response.ok) {
                    throw new Error("Product not found");
                }
                const formattedProducts = data.map((product) => ({
                    id: product._id,
                    name: product.name,
                    description: product.description,
                    image: product.images?.[0] || "", // Obsługa pustych obrazów
                    price: product.price,
                    stock: product.stock,
                    category: product.category_id?.name || "Brak kategorii", // Obsługa pustych kategorii
                }));
                setProducts(formattedProducts)


            }
            catch (e) {
                setError(e)
            }
            finally {
                setLoading(false);
            }
        }
    fetchProducts()
        }, [])

return (
    <ProductContext.Provider
    value={{
    products,
    loading,
    error
    }}>
        {children}
    </ProductContext.Provider>
)
}
export const useProduct = () =>useContext(ProductContext)