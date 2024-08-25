import styles from "./Main.module.css";
import Sidebar from "../Sidebar/Sidebar";
import DetailsSidebar from "../DetailsSidebar/DetailsSidebar";
import { createContext, useEffect, useReducer } from "react";
import CreateNetwork from "../CreateNetwork/CreateNetwork";
import TutorialPopUp from "../TutorialPopUp/TutorialPopUp";
import Graphs from "../Graphs/Graphs";
import FinishTestingPopUp from "../FinishTestingPopUp/FinishTestingPopUp";

// Will be used to allow all child components to access the graph data.
export const GraphContext = createContext({});

function reducer(state, action) {
    return { ...state, ...action };
}

function Main() {
    const [state, dispatch] = useReducer(reducer, {
        selectedGraph: null,
        canvasOffset: 720,
        createNetworkPopUp: false,
        finishTestingPopUp: false,
        graphs: JSON.parse(localStorage.getItem("graphs")) || [],
        addTutorialPopUp: true,
        selectedNode: null
    });

    // Function that updates the selected node
    function updateSelectedNode(node) {
        dispatch({ selectedNode: node });
    }

    // Function that updates the state of the 'create network' popup
    function updateCreateNetworkPopUp(state) {
        dispatch({ createNetworkPopUp: state });
    }

    // Function that updates the currently selected graph
    function updateSelectedGraph(graph) {
        dispatch({ selectedGraph: graph });
    }

    // Function that updates the list of graphs
    function updateGraphs(graphs) {
        dispatch({ graphs: graphs });
    }

    // Function that updates the state of the tutorial popup
    function updateTutorialPopUp(state) {
        dispatch({ addTutorialPopUp: state });
    }

    // Function that updates the canvas offset
    function updateCanvasOffset(offset) {
        dispatch({ canvasOffset: offset });
    }

    // Function that updates the state of the 'finish testing' popup
    function updateFinishTestingPopUp(state) {
        dispatch({ finishTestingPopUp: state });
    }

    useEffect(() => {
        // If no graph is selected and the user has at least one graph uploaded, 
        // then automatically choose the first graph. Runs when a graph is added or deleted.
        if (state.selectedGraph == null && state.graphs.length > 0) {
            dispatch({
                selectedNode: null,
                selectedGraph: state.graphs[0]
            });
        }
    }, [state.graphs, state.selectedGraph]);

    return (
        <GraphContext.Provider value={{ 
            selectedGraph: state.selectedGraph, updateSelectedGraph: updateSelectedGraph, 
            graphs: state.graphs, updateGraphs: updateGraphs 
        }}>
            {state.addTutorialPopUp && <TutorialPopUp updateTutorialPopUp={updateTutorialPopUp} />}
            {state.createNetworkPopUp && <CreateNetwork updateCreateNetworkPopUp={updateCreateNetworkPopUp} />}
            {state.finishTestingPopUp && <FinishTestingPopUp updateFinishTestingPopUp={updateFinishTestingPopUp} />}
            <div className={styles.mainPage}>
                <Sidebar 
                    networkNames={state.graphs.map((graph) => graph.networkName)}
                    updateCreateNetworkPopUp={updateCreateNetworkPopUp} 
                    updateTutorialPopUp={updateTutorialPopUp}
                />
                {state.selectedGraph != null ?
                <>
                    <Graphs
                        graphs={state.graphs}
                        selectedNode={state.selectedNode}
                        updateSelectedNode={updateSelectedNode}
                        canvasOffset={state.canvasOffset}
                    />
                    <DetailsSidebar
                        canvasOffset={state.canvasOffset} 
                        updateCanvasOffset={updateCanvasOffset} 
                        selectedNode={state.selectedNode}
                        updateSelectedNode={updateSelectedNode}
                        updateFinishTestingPopUp={updateFinishTestingPopUp}
                    />
                </> :
                <div className={styles.noNetworksFound}>
                    <div>
                        <p className={styles.noNetworksText}>
                            You currently have no networks to show...
                        </p>
                        <button className={`${styles.startVisualising} primaryBtn`} onClick={() => updateCreateNetworkPopUp(true)}>
                            Start Visualising
                        </button>
                    </div>
                </div>}
            </div>
        </GraphContext.Provider>
    )
}

export default Main;