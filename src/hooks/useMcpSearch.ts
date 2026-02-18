import { useState } from "react";
import { searchMCP } from "@/services/mcpApi";
import type { MCPResult } from "@/types/mcp";

export function useMcpSearch() {
    const [data, setData] = useState<MCPResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = async (intent: string) => {
        if (!intent.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const result = await searchMCP(intent);
            setData(result);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Something went wrong";
            setError(message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, search };
}
