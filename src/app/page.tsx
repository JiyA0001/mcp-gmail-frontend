"use client";

import SearchBox from "@/components/SearchBox/SearchBox";
import ResultsView from "@/components/ResultsView/ResultsView";
import LoginBox from "@/components/Auth/LoginBox";
import ConnectGmail from "@/components/Auth/ConnectGmail";
import { useMcpSearch } from "@/hooks/useMcpSearch";
import { useAuthStatus } from "@/hooks/useAuthStatus";

export default function HomePage() {
  const { data, loading, error, search } = useMcpSearch();
  const { loading: authLoading, loggedIn, gmailConnected } = useAuthStatus();

  if (authLoading) return <p>Loading...</p>;

  if (!loggedIn) {
    return (
      <main style={{ padding: 40 }}>
        <h1>MCP Gmail AI Agent</h1>
        <LoginBox onLogin={() => window.location.reload()} />
      </main>
    );
  }

  if (!gmailConnected) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Connect Gmail</h1>
        <ConnectGmail />
      </main>
    );
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>MCP Gmail AI Agent</h1>
      <SearchBox onSearch={search} />
      {loading && <p>Searching…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && <ResultsView data={data} />}
    </main>
  );
}
