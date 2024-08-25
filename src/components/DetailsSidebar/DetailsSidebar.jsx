import styles from "./DetailsSidebar.module.css";
import GraphDetails from "./GraphDetails/GraphDetails";
import NetworkStatistics from "./NetworkStatistics/NetworkStatistics";
import SelectedNode from "./SelectedNode/SelectedNode";

function DetailsSidebar({ canvasOffset, updateCanvasOffset, selectedNode, updateSelectedNode, updateFinishTestingPopUp }) {
    // Toggles the details sidebar on and off to improve
    // screen space for graph visualisation.
    function toggleDetails() {
        // If the details sidebar is open, close it.
        const offset = canvasOffset === 720 ? 390 : 720;
        updateCanvasOffset(offset);
    }

    // Function to open the 'finish testing' popup window for users to provide user feedback
    function finishTesting() {
        updateFinishTestingPopUp(true);
    }       

    return (
        <div className={`sidebar ${styles.detailsSidebar}`} style={canvasOffset != 720 ? { minWidth: '30px' } : {}}>
            <div style={{ position: "relative" }}>
                <button className={`sideText ${styles.toggleSidebarButton}`} onClick={toggleDetails}>
                    {canvasOffset == 720 ? ">>" : "<<"}
                </button>
            </div>
            {canvasOffset == 720 &&
            <div className={styles.detailsWrapper}>
                <GraphDetails />
                <NetworkStatistics />
                {selectedNode && 
                <SelectedNode 
                    selectedNode={selectedNode} 
                    updateSelectedNode={updateSelectedNode}
                />}
                <div className={styles.finishTestingWrapper}>
                    <div className={styles.finishTestingInnerWrapper}>
                        <button className={`${styles.finishTesting} primaryBtn`} onClick={finishTesting}>
                            Finish testing
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default DetailsSidebar;