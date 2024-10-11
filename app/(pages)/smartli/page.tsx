import AuthenticatedLayout from "../../components/Layout/AuthenticatedLayout";
import Loader from "../../components/Loader";

import styles from "../../styles/Smartli.module.css"

export default function Smartli() {
    return (

        <AuthenticatedLayout >
            <div className={styles.containerSmartli}>
                <Loader />
            </div>
        </AuthenticatedLayout >

    );
}