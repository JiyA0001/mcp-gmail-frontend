"use client";

import { useState } from "react";

export default function LoginBox({ onLogin }: { onLogin: () => void }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email) return;

        setLoading(true);

        try {
            await fetch(`${process.env.NEXT_PUBLIC_MCP_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
                credentials: "include",
            });
            // We'll call onLogin anyway to trigger re-renders or navigation
            onLogin();
        } catch (error) {
            console.error("Login failed", error);
            // Optionally handle error state here
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-2xl">
            <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white text-center">Welcome Back</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-8 text-sm">Sign in to access your AI agent</p>

            <div className="space-y-5">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all"
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    />
                </div>
                <button
                    onClick={handleLogin}
                    disabled={loading || !email}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging in...
                        </span>
                    ) : (
                        "Login"
                    )}
                </button>
            </div>
        </div>
    );
}
