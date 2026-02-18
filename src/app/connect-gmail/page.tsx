"use client";

import { useState } from "react";

export default function ConnectGmailPage() {
    const [clientId, setClientId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [message, setMessage] = useState("");

    const backendUrl = process.env.NEXT_PUBLIC_MCP_BASE_URL;

    const saveCredentials = async () => {
        try {
            const res = await fetch(`${backendUrl}/connect/google`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client_id: clientId,
                    client_secret: clientSecret,
                }),
            });

            if (!res.ok) throw new Error();

            setMessage("Credentials saved successfully!");
        } catch {
            setMessage("Failed to save credentials");
        }
    };

    const connectGmail = () => {
        window.location.href = `${backendUrl}/auth/login`;
    };

    return (
        <main style={{ padding: 40 }}>
            <h1>Connect Gmail</h1>

            <p>
                Add this redirect URI in Google Cloud:
            </p>

            <code>{backendUrl}/auth/callback</code>

            <div style={{ marginTop: 20 }}>
                <input
                    placeholder="Google Client ID"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    style={{ width: "100%", marginBottom: 10 }}
                />

                <input
                    placeholder="Google Client Secret"
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                    style={{ width: "100%", marginBottom: 10 }}
                />

                <button onClick={saveCredentials}>
                    Save Credentials
                </button>

                <button
                    onClick={connectGmail}
                    style={{ marginLeft: 10 }}
                >
                    Connect Gmail
                </button>
            </div>

            {message && <p>{message}</p>}
        </main>
    );
}
