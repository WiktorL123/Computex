import {useCategory} from "@/app/context/CategoryContext";
import Link from "next/link";
import {useProduct} from "@/app/context/ProductContext";

export default function Navbar({isOpen}) {
    if (!isOpen)return null;
    const {categories, loading, error} = useCategory()
    const {selectCategory} = useProduct();


        if (loading) return <div>trwa ładowanie kategorii....</div>
        if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={`bg-white dark:bg-dark w-full shadow-md ${isOpen ? "block" : "hidden"} xs:block`}>
            <ul className="flex flex-col xs:flex-row justify-start xs:justify-between items-start xs:items-center space-y-4 xs:space-y-0 xs:space-x-6 p-4 xs:p-2">
                {categories.map((category) => (
                    <li key={category.id}
                        className="text-gray-900 dark:text-white xs:mx-1/2 hover:bg-gray-400 cursor-pointer h-fit xs:w-full">
                        <Link href={`/categories/${category.id}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
                <li
                    onClick={() => selectCategory("all")}
                    className="text-gray-900 dark:text-white hover:bg-gray-400 cursor-pointer h-fit xs:w-full"
                >
                    <Link href="/categories/all">Wszystkie produkty</Link>
                </li>
            </ul>
        </div>
    );
}