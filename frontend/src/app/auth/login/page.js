'use client';

import { useRouter } from 'next/navigation';
import LoginForm from '@/app/components/LoginForm';


export default function LoginPage() {
    const router = useRouter();

    return (
        <div className="bg-white dark:bg-dark min-h-screen flex flex-col items-center justify-center w-full">


            <div className="bg-white dark:bg-darkProduct p-6 rounded-lg max-w-md mt-10 w-full">
                <h1 className="text-2xl font-bold mb-6 text-center text-white">Zaloguj się</h1>
                <LoginForm onRegisterRedirect={() => router.push('/auth/register')} />
            </div>
        </div>
    );
}
