import AuthHeader from "@/app/components/AuthHeader";

export default function AuthLayout({ children }) {
    console.log("AuthLayout rendered"); // Tymczasowy test
    return (
        <div className="bg-gray-100 min-h-screen">

            <AuthHeader />


            <div className="flex items-center justify-center">
                <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
