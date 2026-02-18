import { useEffect, useState } from "react";

export function useAuthStatus() {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [gmailConnected, setGmailConnected] = useState(false);

    useEffect(() => {
        async function checkStatus() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_MCP_BASE_URL}/auth/status`,
                    { credentials: "include" }
                );

                if (!res.ok) {
                    setLoggedIn(false);
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                setLoggedIn(data.logged_in);
                setGmailConnected(data.gmail_connected);
            } catch {
                setLoggedIn(false);
            } finally {
                setLoading(false);
            }
        }

        checkStatus();
    }, []);

    return { loading, loggedIn, gmailConnected };
}
