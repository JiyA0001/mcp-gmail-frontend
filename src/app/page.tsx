"use client";

import SearchBox from "@/components/SearchBox/SearchBox";
import ResultsView from "@/components/ResultsView/ResultsView";
import { useMcpSearch } from "@/hooks/useMcpSearch";

export default function HomePage() {
  const { data, loading, error, search } = useMcpSearch();

  return (
    <main style={{ padding: 40 }}>
      <h1>MCP Gmail Search</h1>

      <SearchBox onSearch={search} />

      {loading && <p>Searching…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && <ResultsView data={data} />}
    </main>
  );
}
