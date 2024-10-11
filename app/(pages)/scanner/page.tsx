import AuthenticatedLayout from "../../components/Layout/AuthenticatedLayout";
import Loader from "../../components/Loader";
import styles from "../../styles/Scanner.module.css"

export default function ScannerPage() {
    return (
        <AuthenticatedLayout>

            <div className={styles.containerScanner}>
                <Loader />
            </div>
        </AuthenticatedLayout>

    );
}