import PopUpWrapper from "../../../wrappers/PopUpWrapper/PopUpWrapper";
import styles from "./InvalidDataFound.module.css";

function InvalidDataFound({ setInvalidDataFound, visualiseNetwork }) {
    // Function to cancel visualisation due to invalid nodes or edges found
    function cancel() {
        setInvalidDataFound(false);
    }

    // Function to proceed to visualising the network and remove invalid nodes and edges
    function proceed() {
        visualiseNetwork();
    }

    return (
        <PopUpWrapper setPopUp={setInvalidDataFound} title="Invalid data found">
            <p className={styles.message}>Some nodes or edges in your files were invalid or duplicated. Proceed?</p>
            <div className={styles.btnWrapper}>
                <button className={`${styles.btn} primaryBtn`} onClick={proceed}>
                    Yes
                </button>
                <button className={`${styles.btn} btn removeBtn`} onClick={cancel}>
                    Cancel
                </button>
            </div>
        </PopUpWrapper>
    )
}

export default InvalidDataFound;