import styles from "./Sidebar.module.css";
import NetworksList from "./NetworksList/NetworksList";
import Colours from "./Colours/Colours";
import CompareNetworks from "./CompareNetworks/CompareNetworks";

function Sidebar({ networkNames, updateCreateNetworkPopUp, updateTutorialPopUp }) {
    // Function that opens the tutorial popup
    function openTutorial() {
        updateTutorialPopUp(true)
    }

    return (
        <div className={`sidebar ${styles.leftSidebar}`}>
            <div>
                <div className={styles.titleContianer}>
                    <h1 className={styles.title}>
                        EZ Graph
                    </h1>
                    <button className={`${styles.tutorialBtn} primaryBtn`} onClick={openTutorial}>
                        Tutorial
                    </button>
                </div>
                <NetworksList 
                    networkNames={networkNames} 
                    updateCreateNetworkPopUp={updateCreateNetworkPopUp}
                />
                <CompareNetworks />
            </div>
            <Colours />
        </div>
    )
}

export default Sidebar;