import AuthHeader from "@/app/components/AuthHeader";

export default function AuthLayout({ children }) {
    return (
        <div className="bg-gray-100 min-h-screen">

            <AuthHeader />


            <div className=" bg-white dark:bg-dark flex items-center justify-center">
                <div className="bg-white dark:bg-darkp-6 rounded-md shadow-md w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
