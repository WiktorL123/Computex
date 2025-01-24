export default function AuthLayout({ children }) {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                {children}
            </div>
        </div>
    );
}
