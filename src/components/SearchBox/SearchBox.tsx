"use client";

type Props = {
    onSearch: (intent: string) => void;
};

export default function SearchBox({ onSearch }: Props) {
    return (
        <form
            className="w-full max-w-2xl mx-auto mb-10 relative group"
            onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector("input");
                if (input?.value.trim()) {
                    onSearch(input.value.trim());
                }
            }}
        >
            <div className="relative flex items-center transform transition-transform group-hover:scale-[1.01]">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <input
                    className="w-full h-16 pl-14 pr-32 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-white"
                    placeholder="Ask about your Gmail... e.g., 'Find all emails from last week'"
                />
                <button
                    className="absolute right-2.5 top-2.5 bottom-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
