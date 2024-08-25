import NetworkListItem from "./NetworkListItem";
import styles from "./NetworksList.module.css";
import { useContext, useRef, useState } from "react";
import { GraphContext } from "../../Main/Main";
import { parseJsonFile } from "../../../utils/parseJsonFile";
import ErrorPopUp from "../../ErrorPopUp/ErrorPopUp";
import { graphDataSchema } from "../../../utils/graphDataSchema";

function NetworksList({ networkNames, updateCreateNetworkPopUp }) {
    const graphContext = useContext(GraphContext);
    const [errorMessage, setErrorMessage] = useState("");
    const importNetworkRef = useRef(null);

    // Updates the selected graph to the graph that the user selected.
    function updateSelectedGraph(networkName) {
        graphContext.updateSelectedGraph(graphContext.graphs.find((x) => x.networkName === networkName));
    }

    // Validates the format of the graph imported by the user
    function checkGraphDataFormat(graphData) {
        const { error } = graphDataSchema.validate(graphData);
        return error === undefined;
    }

    // Function that allows the user to import their downloaded graph from EZ-Graph
    async function importNetwork() {
        if (importNetworkRef.current && importNetworkRef.current.files) {
            const file = importNetworkRef.current.files[0];
            // Parse the json file imported by the user into a JavaScript object
            const graphData = await parseJsonFile(file);
            
            // Validate the format of the graph
            const validGraphData = checkGraphDataFormat(graphData);
            // Check if the name of the graph already exists in the user's current graphs
            const graphNameExists = graphContext.graphs.find((graph) => graph.networkName === graphData.networkName) !== undefined;

            if (!validGraphData) {
                setErrorMessage("This is not a valid network. Please make sure you are importing a network downloaded from EZ Graph.");
                return;
            } else if (graphNameExists) {
                setErrorMessage("A network with this name already exists.");
                return;
            }

            const graphs = JSON.parse(localStorage.getItem("graphs")) || [];
            // Update the local storage with the new imported graph
            localStorage.setItem("graphs", JSON.stringify([...graphs, graphData]));

            // Updated the graphs array with the new imported graph
            graphContext.updateGraphs([
                ...graphContext.graphs,
                graphData
            ]);
        }
    }

    // Function that trigger the file input to open the file explorer for the user
    function triggerFileUpload() {
        if (importNetworkRef.current) {
            importNetworkRef.current.click();
        }
    }

    return (
        <>
            {errorMessage !== "" &&
            <ErrorPopUp 
                errorMessage={errorMessage} 
                setErrorMessage={setErrorMessage}
            />}
            <h2 className="sidebarSubTitle">
                Networks (max 2)
            </h2>
            {networkNames.map((name) => {
                return (
                    <NetworkListItem
                        networkName={name}
                        updateSelectedGraph={updateSelectedGraph}
                        isSelected={graphContext.selectedGraph?.networkName === name}
                        key={name}
                    />
                )
            })}
            {networkNames.length < 2 &&
            <div className={styles.networkActions}>
                <button className={styles.addNetwork} onClick={() => updateCreateNetworkPopUp(true)}>
                    + Create a network
                </button>
                <button className={styles.addNetwork} onClick={triggerFileUpload}>
                    + Import existing network (JSON file)
                </button>
                <input 
                    type="file" 
                    hidden={true} 
                    ref={importNetworkRef} 
                    onChange={importNetwork}
                    accept=".json"
                />
            </div>}
        </>
    )
}

export default NetworksList;