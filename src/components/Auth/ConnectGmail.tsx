"use client";

export default function ConnectGmail() {
    const handleConnect = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_MCP_BASE_URL}/auth/login`;
    };

    return (
        <div style={{ marginBottom: 20 }}>
            <button onClick={handleConnect}>
                Connect Gmail
            </button>
        </div>
    );
}
