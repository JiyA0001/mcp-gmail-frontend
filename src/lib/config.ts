export const config = {
    mcpBaseUrl: process.env.NEXT_PUBLIC_MCP_BASE_URL as string,
};

if (!config.mcpBaseUrl) {
    throw new Error("NEXT_PUBLIC_MCP_BASE_URL is not defined");
}
