import {createContext, useContext, useState, useEffect} from "react";

const CategoryContext = createContext()

export const CategoryProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:4002/api/categories",
                    {
                        method: "GET",
                    });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error("Category not found");

                }

                const formattedCategories = data.categories.map(cat=>({
                    id: cat._id,
                    name: cat.name,
                }))
                console.log(formattedCategories);
                setCategories(formattedCategories);
                console.log(data);
            }
            catch(e) {
                    setError(e);
            }
            finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, [])

    return (
        <CategoryContext.Provider
            value={{
                categories,
                loading,
                error,
            }}
        >{children}</CategoryContext.Provider>
    )
}

export const useCategory = () => useContext(CategoryContext);
