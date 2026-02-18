"use client";

import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Link href="/">MCP Gmail</Link>
            </div>

            <div className={styles.right}>
                <Link href="/connect-gmail">Connect Gmail</Link>
            </div>
        </nav>
    );
}
