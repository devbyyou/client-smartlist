"use client"
import styles from "../../styles/Loader.module.css"

export default function Loader() {
    return (
        <div className={styles.contentLoader}>
            <div className={styles.spinner}>
            </div>
        </div>
    );
}



