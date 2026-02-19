"use client";

import SearchBox from "@/components/SearchBox/SearchBox";
import ResultsView from "@/components/ResultsView/ResultsView";
import LoginBox from "@/components/Auth/LoginBox";
import ConnectGmail from "@/components/Auth/ConnectGmail";
import { useMcpSearch } from "@/hooks/useMcpSearch";
import { useAuthStatus } from "@/hooks/useAuthStatus";

export default function HomePage() {
  const { data, loading, error, search } = useMcpSearch();
  const { loading: authLoading, loggedIn, gmailConnected, hasCredentials } = useAuthStatus();

  if (authLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-500 font-medium">Loading MCP...</p>
        </div>
      </main>
    );
  }

  // Not Logged In
  if (!loggedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="w-full max-w-sm flex flex-col items-center">
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg">
            <svg className="w-12 h-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-center">MCP Gmail</h1>
          <p className="text-gray-500 mb-8 text-center text-lg">Your AI-powered Gmail Assistant</p>
          <LoginBox onLogin={() => window.location.reload()} />
        </div>
      </main>
    );
  }

  // Setup Required (BYOK)
  if (!hasCredentials) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 text-center">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h1 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Setup Required</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">You need to provide your own Google Client ID and Secret to use this app. This ensures your data stays private and secure.</p>
          <button
            onClick={() => window.location.href = "/connect-gmail"}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Setup Credentials
          </button>
        </div>
      </main>
    );
  }

  // Gmail Not Connected
  if (!gmailConnected) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 rounded-full"></div>
          <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <svg className="w-16 h-16 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white text-center">Connect Your Inbox</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md text-lg">Connect your Gmail account to let the AI agent assist you with your emails, search efficiently, and summarize threads.</p>
        <ConnectGmail />
      </main>
    );
  }

  // Main Interface
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 tracking-tight pb-2">
            How can I help you today?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
            Search your emails, find specific threads, or get intelligent summaries using natural language.
          </p>
        </div>

        <SearchBox onSearch={search} />

        <div className="mt-8 transition-all duration-300 ease-in-out">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 animate-in fade-in duration-500">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <div className="h-8 w-8 bg-indigo-100 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p className="text-gray-500 font-medium mt-4">Analyzing your inbox...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-2">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {data && <ResultsView data={data} />}
        </div>
      </div>
    </main>
  );
}
