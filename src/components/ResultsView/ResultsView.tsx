import styles from "./ResultsView.module.scss";
import type { MCPResult } from "@/types/mcp";

function renderValue(value: unknown): React.ReactNode {
    if (Array.isArray(value)) {
        return (
            <ul>
                {value.map((v, i) => (
                    <li key={i}>{renderValue(v)}</li>
                ))}
            </ul>
        );
    }

    if (typeof value === "object" && value !== null) {
        return (
            <ul>
                {Object.entries(value).map(([k, v]) => (
                    <li key={k}>
                        <strong>{k}:</strong> {renderValue(v)}
                    </li>
                ))}
            </ul>
        );
    }

    return <span>{String(value)}</span>;
}

export default function ResultsView({ data }: { data: MCPResult }) {
    return <div className={styles.results}>{renderValue(data)}</div>;
}
