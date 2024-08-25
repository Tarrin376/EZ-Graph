import styles from "./ErrorPopUp.module.css";
import CloseSvg from "../CloseSvg";
import { useCallback, useEffect } from "react";

function ErrorPopUp({ errorMessage, setErrorMessage }) {
    // Function to close the error popup
    const closeError = useCallback(() => {
        if (errorMessage !== "") {
            setErrorMessage("");
        }
    }, [setErrorMessage, errorMessage]);

    // Use effect hook to close the error popup after 6 seconds
    useEffect(() => {
        setTimeout(() => {
            closeError();
        }, 6000);
    }, [closeError]);

    return (
        <div className={styles.error}>
            <p className={styles.errorMessage}>{errorMessage}</p>
            <CloseSvg
                size={22}
                colour="white"
                action={closeError}
            />
        </div>
    )
}

export default ErrorPopUp;