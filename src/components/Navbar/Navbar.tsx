"use client";

import Link from "next/link";
import { useAuthStatus } from "@/hooks/useAuthStatus";

export default function Navbar() {
    const { gmailConnected, hasCredentials, loading, loggedIn } = useAuthStatus();

    const handleLogout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_MCP_BASE_URL}/auth/logout`, {
                method: "POST",
                credentials: "include"
            });
            window.location.reload();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-all duration-300">
            <div className="flex items-center">
                <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 hover:opacity-80 transition-opacity">
                    MCP Gmail
                </Link>
            </div>

            <div className="flex items-center gap-4">
                {!loading && loggedIn && (
                    <>
                        {/* Logout Button (Only if logged in which is implied by not loading? No, wait. We need to check loggedIn state from hook) */}
                        {/* Wait, useAuthStatus returns loggedIn boolean. let's grab it. */}

                        {gmailConnected ? (
                            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-sm font-medium">Gmail Connected</span>
                            </div>
                        ) : hasCredentials ? (
                            <a
                                href={`${process.env.NEXT_PUBLIC_MCP_BASE_URL}/oauth/login`}
                                className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-2 rounded-lg shadow-sm"
                            >
                                Authorize Gmail
                            </a>
                        ) : (
                            <Link
                                href="/connect-gmail"
                                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                Connect Gmail
                            </Link>
                        )}

                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors px-3 py-2"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
