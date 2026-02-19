import type { MCPResult } from "@/types/mcp";

function renderValue(value: unknown): React.ReactNode {
    if (Array.isArray(value)) {
        if (value.length === 0) return <span className="text-gray-400 italic">Empty list</span>;

        return (
            <ul className="flex flex-col gap-3 mt-2">
                {value.map((v, i) => (
                    <li key={i} className="relative">
                        {renderValue(v)}
                    </li>
                ))}
            </ul>
        );
    }

    if (typeof value === "object" && value !== null) {
        return (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                <ul className="space-y-2">
                    {Object.entries(value).map(([k, v]) => (
                        <li key={k} className="flex flex-col sm:flex-row sm:gap-3">
                            <span className="font-semibold text-gray-700 dark:text-gray-200 min-w-[120px] shrink-0 capitalize text-sm sm:text-base py-0.5">{k.replace(/_/g, ' ')}</span>
                            <div className="text-gray-600 dark:text-gray-300 break-words w-full">
                                {renderValue(v)}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    // Handle URLs specifically to make them clickable
    const strValue = String(value);
    if (strValue.startsWith('http')) {
        return (
            <a href={strValue} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline break-all">
                {strValue}
            </a>
        );
    }

    return <span className="text-gray-800 dark:text-gray-200">{strValue}</span>;
}

export default function ResultsView({ data }: { data: MCPResult }) {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-1 bg-indigo-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Results</h2>
            </div>
            {renderValue(data)}
        </div>
    );
}
