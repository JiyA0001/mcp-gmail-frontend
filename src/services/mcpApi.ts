import type { MCPResult } from "@/types/mcp";

export async function searchMCP(intent: string): Promise<MCPResult> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_MCP_BASE_URL}/mcp/search?intent=${encodeURIComponent(
            intent
        )}`,
        {
            method: "GET",
            credentials: "include", // 🔥 VERY IMPORTANT
        }
    );

    if (res.status === 401) {
        throw new Error("Please login and connect Gmail first.");
    }

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Search failed");
    }

    return res.json();
}
