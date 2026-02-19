"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ConnectGmailPage() {
    const [clientId, setClientId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const router = useRouter();

    const backendUrl = process.env.NEXT_PUBLIC_MCP_BASE_URL;
    const redirectUri = `${backendUrl}/oauth/callback`;

    const saveCredentials = async () => {
        if (!clientId.trim() || !clientSecret.trim()) {
            setMessage("Please fill in both fields.");
            setStatus("error");
            return;
        }

        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch(`${backendUrl}/connect/google`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client_id: clientId.trim(),
                    client_secret: clientSecret.trim(),
                }),
            });

            if (!res.ok) throw new Error("Failed to save credentials");

            setStatus("success");
            setMessage("Credentials saved! Redirecting to login...");

            // Short delay to show success state before redirecting
            setTimeout(() => {
                router.push("/");
            }, 1500);
        } catch (err) {
            console.error(err);
            setStatus("error");
            setMessage("Failed to save credentials. Please try again.");
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add a toast notification here
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="md:flex md:gap-8">
                    {/* Instructions Column */}
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 border-b border-indigo-100 dark:border-indigo-800">
                                <h2 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Setup Instructions
                                </h2>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700 ml-3">
                                    <div className="mb-8 relative">
                                        <span className="absolute -left-[39px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-bold text-sm ring-4 ring-white dark:ring-gray-800">1</span>
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Go to Google Cloud Console</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Create a new project or select an existing one.</p>
                                        <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mt-1 inline-block">Open Console &rarr;</a>
                                    </div>

                                    <div className="mb-8 relative">
                                        <span className="absolute -left-[39px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-bold text-sm ring-4 ring-white dark:ring-gray-800">2</span>
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Configure OAuth Consent Screen</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Go to <span className="font-medium text-gray-800 dark:text-gray-200">APIs & Services &gt; OAuth consent screen</span>. Select <strong>External</strong> for User Type if available, or Internal.</p>
                                    </div>

                                    <div className="mb-8 relative">
                                        <span className="absolute -left-[39px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-bold text-sm ring-4 ring-white dark:ring-gray-800">3</span>
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Create Credentials</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Go to <span className="font-medium text-gray-800 dark:text-gray-200">Credentials &gt; Create Credentials &gt; OAuth client ID</span>.</p>
                                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 pl-2 space-y-1">
                                            <li>Application type: <strong>Web application</strong></li>
                                            <li>Name: <strong>MCP Gmail</strong> (or any name)</li>
                                        </ul>
                                    </div>

                                    <div className="relative">
                                        <span className="absolute -left-[39px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-bold text-sm ring-4 ring-white dark:ring-gray-800">4</span>
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Add Redirect URI</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Copy this URL and add it to <strong>Authorized redirect URIs</strong>:</p>
                                        <div className="bg-gray-100 dark:bg-gray-900 rounded-md p-3 flex items-center justify-between group border border-gray-200 dark:border-black">
                                            <code className="text-xs text-gray-800 dark:text-gray-300 font-mono break-all">{redirectUri}</code>
                                            <button
                                                onClick={() => copyToClipboard(redirectUri)}
                                                className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-md hover:bg-white dark:hover:bg-gray-800 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                title="Copy to clipboard"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="md:w-1/2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 sticky top-8">
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Enter Credentials</h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">Paste the Client ID and Secret you just created.</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Client ID
                                    </label>
                                    <input
                                        id="clientId"
                                        type="text"
                                        placeholder="e.g. 123456789-abc...apps.googleusercontent.com"
                                        value={clientId}
                                        onChange={(e) => setClientId(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="clientSecret" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Client Secret
                                    </label>
                                    <input
                                        id="clientSecret"
                                        type="password"
                                        placeholder="e.g. GOCSPX-..."
                                        value={clientSecret}
                                        onChange={(e) => setClientSecret(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-all shadow-sm font-mono text-sm"
                                    />
                                </div>

                                {status === "error" && (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded-lg flex items-start gap-3">
                                        <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <p className="text-sm text-red-600 dark:text-red-300 font-medium">{message}</p>
                                    </div>
                                )}

                                {status === "success" && (
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 rounded-lg flex items-start gap-3">
                                        <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-sm text-green-600 dark:text-green-300 font-medium">{message}</p>
                                    </div>
                                )}

                                <button
                                    onClick={saveCredentials}
                                    disabled={status === "loading" || status === "success"}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transform active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        "Save and Connect"
                                    )}
                                </button>

                                <div className="text-center">
                                    <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
                                        Cancel and return home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
