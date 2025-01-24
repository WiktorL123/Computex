import {useCategory} from "@/app/context/CategoryContext";
import {useEffect} from "react";

export default function Navbar({isOpen}) {
    if (!isOpen)return null;
    const {categories, loading, error} = useCategory()

        if (loading) return <div>Loading...</div>
        if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={`bg-white dark:bg-dark w-full shadow-md ${isOpen ? "block" : "hidden"} xs:block`}>
            <ul className="flex flex-col xs:flex-row justify-start xs:justify-between items-start xs:items-center space-y-4 xs:space-y-0 xs:space-x-6 p-4 xs:p-2">
                {categories.map((category) => (
                    <li key={category.id}
                        className="text-gray-900 dark:text-white xs:mx-1/2 hover:bg-gray-400 cursor-pointer h-fit xs:w-full
                          ">
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}