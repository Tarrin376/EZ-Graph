import { useState } from "react";
import PopUpWrapper from "../../wrappers/PopUpWrapper/PopUpWrapper";
import { tutorialData } from "../../utils/tutorialData";
import styles from "./TutorialPopUp.module.css";
import NodesImg from "../../assets/nodes.webp";
import EdgesImg from "../../assets/edges.webp";
import GraphPic from "../../assets/graph-pic.webp";
import Dropdown from "../../assets/dropdown.webp";

function TutorialPopUp({ updateTutorialPopUp }) {
    const [currentPage, setCurrentPage] = useState(0);

    // Sets the current page back to the previous page in the tutorial
    function handleBack() {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }
    
    // Sets the current page to the next page in the tutorial
    function handleForward() {
        if (currentPage < tutorialData.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            updateTutorialPopUp(false);
        }
    }

    return (
        <PopUpWrapper setPopUp={updateTutorialPopUp} title={tutorialData[currentPage].title}>
            <div>
                {tutorialData[currentPage].title === "Creating a network (part 1)" &&
                <div className={styles.formatImagesWrapper}>
                    <div className={styles.formatImage}>
                        <label htmlFor="nodes" className="sideText">Nodes.csv</label>
                        <img id="nodes" src={NodesImg} alt="nodes" />
                    </div>
                    <div className={styles.formatImage}>
                        <label htmlFor="edges" className="sideText">Edges.csv</label>
                        <img id="edges" src={EdgesImg} alt="edges" />
                    </div>
                </div>}
                {tutorialData[currentPage].title === "Understanding the colour coding of the nodes" &&
                <div className={styles.formatImagesWrapper}>
                    <div className={styles.formatImage}>
                        <label htmlFor="nodes" className="sideText">Visualisation using a centrality algorithm</label>
                        <img id="nodes" src={GraphPic} alt="nodes" />
                    </div>
                    <div className={styles.formatImage}>
                        <label htmlFor="edges" className="sideText">Centrality importance colours</label>
                        <img id="edges" src={Dropdown} alt="edges" />
                    </div>
                </div>}
                {tutorialData[currentPage].videoLink &&
                <video autoPlay loop muted style={{ width: '100%' }} key={tutorialData[currentPage].videoLink}>
                    <source src={tutorialData[currentPage].videoLink} />
                    Your browser does not support the video tag.
                </video>}
            </div>
            <p className={styles.description}>{tutorialData[currentPage].text}</p>
            <div className={styles.btnWrapper}>
                {currentPage > 0 && <button className={`${styles.btn} primaryBtn`} onClick={handleBack}>
                    Back
                </button>}
                <button className={`${styles.btn} primaryBtn`} onClick={handleForward}>
                    {currentPage === tutorialData.length - 1 ? "Finish" : "Next"}
                </button>
            </div>
        </PopUpWrapper>
    );
}

export default TutorialPopUp;