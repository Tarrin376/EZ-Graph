import PopUpWrapper from "../../wrappers/PopUpWrapper/PopUpWrapper";
import styles from "./FinishTestingPopUp.module.css";

function FinishTestingPopUp({ updateFinishTestingPopUp }) {
    return (
        <PopUpWrapper title="Thank you very much for testing out EZ Graph!" setPopUp={updateFinishTestingPopUp}>
            <p className={styles.message}>
                Thanks again for volunteering to test out our project and giving valuable feedback that we will use to make EZ Graph
                better and more user-friendly.
            </p>
            <p className={styles.rememberMessage}>
                Please fill out and submit the feedback form below (or click <a href="https://forms.office.com/e/2dePNmtwN6" target="_blank" rel="noreferrer">here</a>) to let us know what you liked and disliked about EZ Graph.
            </p>
            <iframe width="100%" height="480px" src="https://forms.office.com/e/2dePNmtwN6?embed=true" 
            style={{ border: "none", maxWidth: "100%", maxHeight: "100%", borderRadius: "6px" }}
            allowfullscreen webkitallowfullscreen mozallowfullscreen>
            </iframe>
        </PopUpWrapper>
    )
}

export default FinishTestingPopUp;