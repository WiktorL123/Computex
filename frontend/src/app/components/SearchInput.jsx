import Input from "@/app/components/Input";
import { SearchIcon } from "@heroicons/react/solid";
import  '../globals.css'

export default function SearchInput({ className, placeholder }) {
    return (
        <div className={`flex flex-row items-center space-x-2 ${className}`}>
            <Input
                placeholder={placeholder}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
            />
            <button className=" m-0 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-700 focus:outline-none focus:shadow-outline button">
                <SearchIcon className="h-6 w-6 m-0" />
            </button>
        </div>
    );
}
