"use client";

import { useState } from "react";

type ViewState = "login" | "signup" | "forgot-password";

export default function LoginBox({ onLogin }: { onLogin: () => void }) {
    const [view, setView] = useState<ViewState>("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const getTitle = () => {
        switch (view) {
            case "login": return "Welcome Back";
            case "signup": return "Create Account";
            case "forgot-password": return "Reset Password";
        }
    };

    const getSubtitle = () => {
        switch (view) {
            case "login": return "Sign in to access your AI agent";
            case "signup": return "Sign up to get started";
            case "forgot-password": return "Enter your email to receive a reset link";
        }
    };

    const handleSubmit = async () => {
        setError("");
        setSuccessMessage("");

        if (!email) {
            setError("Please enter your email");
            return;
        }

        if (view !== "forgot-password" && !password) {
            setError("Please enter your password");
            return;
        }

        setLoading(true);

        try {
            let url = "";
            let body = {};

            if (view === "login") {
                url = "/auth/login";
                body = { email, password };
            } else if (view === "signup") {
                url = "/auth/signup";
                body = { email, password };
            } else {
                url = "/auth/forgot-password";
                body = { email };
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_MCP_BASE_URL}${url}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || data.error || "Request failed"); // Backend might return .message or .error
            }

            if (view === "login") {
                onLogin();
            } else if (view === "signup") {
                // Auto-login attempt
                try {
                    const loginRes = await fetch(`${process.env.NEXT_PUBLIC_MCP_BASE_URL}/auth/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                        credentials: "include",
                    });
                    if (loginRes.ok) {
                        onLogin();
                        return;
                    }
                } catch { }
                setView("login");
                setSuccessMessage("Account created! Please sign in.");
            } else if (view === "forgot-password") {
                setSuccessMessage("If an account exists, a reset link has been sent.");
                setTimeout(() => setView("login"), 3000);
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-2xl">
            <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white text-center">
                {getTitle()}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-8 text-sm">
                {getSubtitle()}
            </p>

            <div className="space-y-5">
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 rounded-lg text-center animate-pulse">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-900/30 rounded-lg text-center">
                        {successMessage}
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all"
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                </div>

                {view !== "forgot-password" && (
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            {view === "login" && (
                                <button
                                    onClick={() => { setView("forgot-password"); setError(""); setSuccessMessage(""); }}
                                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
                                >
                                    Forgot?
                                </button>
                            )}
                        </div>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all"
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={loading || !email || (view !== "forgot-password" && !password)}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        view === "login" ? "Login" : (view === "signup" ? "Sign Up" : "Send Reset Link")
                    )}
                </button>

                <div className="text-center mt-4 space-y-2">
                    {view !== "login" && (
                        <button
                            onClick={() => { setView("login"); setError(""); setSuccessMessage(""); }}
                            className="block w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Back to Login
                        </button>
                    )}

                    {view === "login" && (
                        <button
                            onClick={() => { setView("signup"); setError(""); setSuccessMessage(""); }}
                            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium focus:outline-none transition-colors"
                        >
                            Need an account? Sign up
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
