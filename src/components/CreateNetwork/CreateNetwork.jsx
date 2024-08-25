import styles from "./CreateNetwork.module.css";
import { useContext, useState, useRef, useReducer } from "react";
import { GraphContext } from "../Main/Main";
import PopUpWrapper from "../../wrappers/PopUpWrapper/PopUpWrapper";
import { filterNodes } from "../../utils/filterNodes";
import { parseCSVFile } from "../../utils/parseCSVFile";
import { filterEdges } from "../../utils/filterEdges";
import { nodeTypes } from "../../utils/nodeTypes";
import { graphTypes } from "../../utils/graphTypes";
import { graphIsAcyclic } from "../../utils/graphIsAcyclic";
import ErrorPopUp from "../ErrorPopUp/ErrorPopUp";
import InvalidDataFound from "./InvalidDataFound/InvalidDataFound";
import { defaultNodeStyles } from "../../utils/defaultNodeStyles";
import { graphIsConnected } from "../../utils/graphIsConnected";
import MoreInfo from "../MoreInfo/MoreInfo";

function reducer(state, action) {
    return { ...state, ...action };
}

function CreateNetwork({ updateCreateNetworkPopUp }) {
    const graphContext = useContext(GraphContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [invalidDataFound, setInvalidDataFound] = useState(false);

    const [state, dispatch] = useReducer(reducer, {
        nodeList: [],
        edgeList: [],
        nodeIDType: nodeTypes.Integer,
        graphType: graphTypes.Directed,
        networkName: "",
        nodeListFileName: "",
        edgeListFileName: "",
        errorMessage: ""
    });

    // Node list file input reference. Used for triggering 'click' event.
    const nodeListFileRef = useRef(null);
    // Edge list file input reference. Used for triggering 'click' event.
    const edgeListFileRef = useRef(null);

    // Changes the type of the node ID.
    function updateNodeIDType(e) {
        const type = e.target.value;
        dispatch({ nodeIDType: type });
    }

    // Changes the graph type to either 'directed' or 'undirected', depending on user input.
    function updateGraphType(e) {
        const type = e.target.value;
        dispatch({ graphType: type });
    }

    // Changes the name of the network to the current value in the text box.
    function updateNetworkName(e) {
        const name = e.target.value;
        dispatch({ networkName: name });
    }

    function validInputs() {
        return state.nodeList.length > 0 && state.edgeList.length > 0 && state.networkName !== "" &&
        !graphContext.graphs.map((graph) => graph.networkName).includes(state.networkName);
    }

    // Filters the list of nodes and edges inputted by the user and
    // runs error checking logic to ensure that the inputs are valid.
    // Creates a graph using the filtered nodes and edges.
    function visualiseNetwork() {
        const { filteredNodes, filteredEdges } = getFilteredGraphData();
        // Close 'Create Network' pop up window.
        updateCreateNetworkPopUp(false);
        // Pass filtered nodes and edges to 'createGraph' function for creation.
        createGraph(filteredNodes, filteredEdges);
    }

    function checkNetwork() {
        const { filteredNodes, filteredEdges } = getFilteredGraphData();

        // If no valid nodes were found in the node list, reject it.
        if (filteredNodes.length === 0) {
            setErrorMessage("Your graph must have at least one valid node.");
            return;
        }

        if (filteredNodes.length > 1000 || filteredEdges.length > 1000) {
            setErrorMessage("Your graph must have no more than 1000 nodes and 1000 edges.");
            return;
        }

        // If at least one node or edge was found to be invalid, inform the user but proceed with graph creation.
        if (filteredNodes.length < state.nodeList.length || filteredEdges.length < state.edgeList.length) {
            setInvalidDataFound(true);
            return;
        }

        visualiseNetwork();
    }

    // Removes the invalid nodes and edges from the graph before visualisation
    function getFilteredGraphData() {
        // Nodes from the graph that are valid
        const filteredNodes = filterNodes(state.nodeList, state.nodeIDType);
        // Edges from the graph that are valid
        const filteredEdges = filterEdges(state.edgeList, state.nodeIDType, new Set(filteredNodes), state.graphType);

        return {
            filteredNodes,
            filteredEdges
        }
    }

    // Creates a new graph using the filtered nodes and edges
    // from the CSV files and updates the state.
    function createGraph(nodes, edges) {
        const nodeArr = nodes.map((node) => { return { id: node } });
        const nodeMap = new Map(nodeArr.map(pair => [pair.id, pair]));
        const edgeObjects = edges.map((edge) => { return { source: nodeMap.get(edge[0]), target: nodeMap.get(edge[1]) }});
        
        // Data about the graph to be added including its nodes, edges, etc.
        const data = {
            nodes: nodeArr,
            links: edges.map((edge) => { return { source: edge[0], target: edge[1] }}),
            isDirected: state.graphType === graphTypes.Directed,
            networkName: state.networkName,
            showParticles: false,
            zoomToFit: false,
            nodeType: state.nodeIDType,
            isDAG: false,
            styles: Object.fromEntries(new Map(nodeArr.map((node) => {
                return [
                    node.id,
                    { ...defaultNodeStyles }
                ]
            })))
        };

        // Extra meta data for graphs that are directed.
        const dagData = graphIsAcyclic({ nodes: data.nodes, links: edgeObjects, isDirected: data.isDirected }) ? {
            isDAG: true,
            dagMode: "None"
        } : {};

        // The graph object to be used for visualisation
        const newGraph = {
            ...data,
            ...dagData,
            isConnected: graphIsConnected({ nodes: data.nodes, links: edgeObjects, isDirected: data.isDirected })
        };

        // Update graphs in local storage session.
        const graphs = JSON.parse(localStorage.getItem("graphs")) || [];
        localStorage.setItem("graphs", JSON.stringify([...graphs, newGraph]));

        // Adds the new graph to the list of graphs.
        graphContext.updateGraphs([
            ...graphContext.graphs,
            newGraph
        ]);
    }

    // File upload trigger that grabs the node list CSV file
    // and passes it to the 'parseCSVFile' function for it to be
    // parsed into a list.
    async function uploadNodeList(e) {
        // Node list CSV file.
        const file = e.target.files[0];

        try {
            const nodes = await parseCSVFile(file);
            dispatch({
                nodeListFileName: file.name,
                nodeList: nodes
            });
        }
        catch (error) {
            setErrorMessage("Failed to parse node list. Please verify that file is in the correct format.");
        }
    }

    // File upload trigger than grabs the edge list CSV file
    // and passes it to the 'parseCSVFile' function for it to be
    // parsed into a list.
    async function uploadEdgeList(e) {
        // Edge list CSV file.
        const file = e.target.files[0];

        try {
            const edges = await parseCSVFile(file);
            dispatch({
                edgeListFileName: file.name,
                edgeList: edges
            });
        }
        catch (error) {
            setErrorMessage("Failed to parse node list. Please verify that file is in the correct format.");
        }
    }

    // If the user's uploaded nodes or edges files contain invalid data, show warning message to user before proceeding
    if (invalidDataFound) {
        return (
            <InvalidDataFound 
                setInvalidDataFound={setInvalidDataFound} 
                visualiseNetwork={visualiseNetwork}
            />
        )
    }

    return (
        <PopUpWrapper setPopUp={updateCreateNetworkPopUp} title="Create a network">
            {errorMessage !== "" &&
            <ErrorPopUp 
                errorMessage={errorMessage} 
                setErrorMessage={setErrorMessage}
            />}
            <div className={styles.wrapper}>
                <div>
                    <div className={styles.fileUpload}>
                        <p className="sideText">Node list:</p>
                        <input 
                            type="file" 
                            accept=".csv"
                            onChange={uploadNodeList} 
                            hidden={true} 
                            ref={nodeListFileRef} 
                        />
                        {state.nodeListFileName !== "" && 
                        <p className="sideText">
                            {state.nodeListFileName}
                        </p>}
                        <button className={`${styles.uploadFileBtn} primaryBtn`} 
                        onClick={() => nodeListFileRef.current.click()}>
                            Upload a file
                        </button>
                    </div>
                    <MoreInfo text="Determines how nodes in the graph are labeled or identified. Nodes with an 'Integer' type are labeled with unique numerical IDs.
                    Nodes with a 'String' type are labeled with unique text-based IDs." size={20} label="Node ID Type:" />
                    <select className={styles.typeDropdown} onChange={updateNodeIDType} defaultValue={nodeTypes.Integer}>
                        {Object.keys(nodeTypes).map((type, index) => {
                            return (
                                <option value={type} key={index}>
                                    {type}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <div className={styles.fileUpload}>
                        <p className="sideText">Edge list:</p>
                        <input 
                            type="file" 
                            accept=".csv"
                            onChange={uploadEdgeList} 
                            hidden={true} 
                            ref={edgeListFileRef} 
                        />
                        {state.edgeListFileName !== "" && 
                        <p className="sideText">
                            {state.edgeListFileName}
                        </p>}
                        <button className={`${styles.uploadFileBtn} primaryBtn`}
                        onClick={() => edgeListFileRef.current.click()}>
                            Upload a file
                        </button>
                    </div>
                    <MoreInfo text="Defines the nature of connections between nodes. Undirected connections between nodes have no specific direction while
                    directed connections have a specific direction. You will see arrows on the edges in your network if the 'Directed' graph type is chosen." 
                    size={20} label="Graph Type:" />
                    <select className={styles.typeDropdown} onChange={updateGraphType} defaultValue={graphTypes.Directed}>
                        {Object.keys(graphTypes).map((type, index) => {
                            return (
                                <option value={type} key={index}>
                                    {type}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <p className={`${styles.networkName} ${styles.type} sideText`}>
                Network name:
            </p>
            <input 
                type="text" 
                className={styles.networkNameInput} 
                placeholder="E.g. LinkedIn network"
                value={state.networkName}
                onChange={updateNetworkName}
            />
            <button className={`${styles.visualiseNetwork} ${!validInputs() ? "disabledBtn" : ""} primaryBtn`} onClick={checkNetwork}>
                Visualise Network
            </button>
        </PopUpWrapper>
    )
}

export default CreateNetwork;