"use client";

import { useState } from "react";

export default function LoginBox({ onLogin }: { onLogin: () => void }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email) return;

        setLoading(true);

        await fetch(`${process.env.NEXT_PUBLIC_MCP_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
            credentials: "include",
        });

        setLoading(false);
        onLogin();
    };

    return (
        <div style={{ marginBottom: 20 }}>
            <h3>Login</h3>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: 8, marginRight: 10 }}
            />
            <button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </div>
    );
}
