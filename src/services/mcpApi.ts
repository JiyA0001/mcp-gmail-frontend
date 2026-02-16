import { config } from "@/lib/config";
import type { MCPResult } from "@/types/mcp";

export async function searchMCP(intent: string): Promise<MCPResult> {
    const url = `${config.mcpBaseUrl}/mcp/search?intent=${encodeURIComponent(
        intent
    )}`;

    const res = await fetch(url);

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to fetch");
    }

    return (await res.json()) as MCPResult;
}
