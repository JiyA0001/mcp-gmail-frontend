"use client";

import styles from "./SearchBox.module.scss";

type Props = {
    onSearch: (intent: string) => void;
};

export default function SearchBox({ onSearch }: Props) {
    return (
        <form
            className={styles.form}
            onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector("input");
                if (input?.value.trim()) {
                    onSearch(input.value.trim());
                }
            }}
        >
            <input className={styles.input} placeholder="Ask about your Gmail…" />
            <button className={styles.button}>Search</button>
        </form>
    );
}
