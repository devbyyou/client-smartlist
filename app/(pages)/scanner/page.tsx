import Loader from "../../components/Loader";
import styles from "../../styles/Scanner.module.css"

export default function ScannerPage() {
    return (
        <div className={styles.containerScanner}>

            <Loader />
        </div>
    );
}