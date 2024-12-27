"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [attempts, setAttempts] = useState(0);
    const MAX_ATTEMPTS = 3;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (attempts >= MAX_ATTEMPTS) {
            alert('Too many failed attempts. Redirecting to the home page.');
            router.push('/');
            return;
        }

        // Validate the password via API
        const isAdminKey = await fetch('/api/validate-admin-key', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        }).then((res) => res.json());

        if (isAdminKey.valid) {
            // Set cookie via API route
            await fetch('/api/set-cookie', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            alert('Login successful! Redirecting...');
            router.push('/admin');
        } else {
            setAttempts((prevAttempts) => prevAttempts + 1);
            alert(`Incorrect password. Attempt ${attempts + 1} of ${MAX_ATTEMPTS}.`);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Admin Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none text-gray-800
                            focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
