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

            setMessage("Credentials saved successfully! Redirecting...");
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        } catch {
            setMessage("Failed to save credentials");
        }
    };

    return (
        <main style={{ padding: 40 }}>
            <h1>Connect Gmail</h1>
            <p>Enter your Google Cloud Console "Client ID" and "Client Secret" here.</p>

            <p>
                <strong>Important:</strong> Add this Authorized Redirect URI in Google Cloud:
            </p>

            <code style={{ display: "block", background: "#eee", padding: 10, margin: "10px 0" }}>
                {backendUrl}/oauth/callback
            </code>

            <div style={{ marginTop: 20 }}>
                <input
                    placeholder="Google Client ID"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    style={{ width: "100%", marginBottom: 10, padding: 8 }}
                />

                <input
                    placeholder="Google Client Secret"
                    value={clientSecret}
                    onChange={(e) => setClientSecret(e.target.value)}
                    style={{ width: "100%", marginBottom: 10, padding: 8 }}
                />

                <button onClick={saveCredentials} style={{ padding: "10px 20px" }}>
                    Save & Continue
                </button>
            </div>

            {message && <p style={{ marginTop: 10 }}>{message}</p>}
        </main>
    );
}
