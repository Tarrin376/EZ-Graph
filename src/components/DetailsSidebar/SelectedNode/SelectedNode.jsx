import styles from "../DetailsSidebar.module.css";
import NodeInfo from "./NodeInfo";
import { useEffect, useCallback, useContext, useReducer } from "react";
import { GraphContext } from "../../Main/Main";
import { convertToAdjList } from "../../../utils/convertToAdjList";
import { nodeStatisticAlgorithms } from "../../../utils/nodeStatisticAlgorithms";
import { updateGraphLocalStorage } from "../../../utils/updateGraphLocalStorage";
import { defaultNodeStyles } from "../../../utils/defaultNodeStyles";
import { graphIsConnected } from "../../../utils/graphIsConnected";

function reducer(state, action) {
    return { ...state, ...action };
}

function SelectedNode({ selectedNode, updateSelectedNode }) {
    const graphContext = useContext(GraphContext);

    const [state, dispatch] = useReducer(reducer, {
        nodeID: selectedNode == null ? selectedNode : selectedNode.id,
        neighbours: [],
        outDegree: 0,
        inDegree: 0,
        clusteringCo: 0
    });

    // Function that deletes a node from the graph if the user requested it
    function deleteNode() {
        const stylesCpy = { ...graphContext.selectedGraph.styles };
        delete stylesCpy[selectedNode.id];

        // The updated graph with the node removed
        const updatedGraph = {
            ...graphContext.selectedGraph,
            links: graphContext.selectedGraph.links.filter((x) => x.source.id !== selectedNode.id && x.target.id !== selectedNode.id),
            nodes: graphContext.selectedGraph.nodes.filter((node) => node.id !== selectedNode.id).map((node) => { return { id: node.id }}),
            styles: Object.fromEntries(new Map(Object.keys(graphContext.selectedGraph.styles).map((node) => {
                return [
                    node,
                    { ...defaultNodeStyles }
                ]
            })))
        };

        // The new graph using the 'updatedGraph'
        const newGraph = {
            ...updatedGraph,
            links: updatedGraph.links.map((x) => { return { source: x.source.id, target: x.target.id }}),
            isConnected: graphIsConnected({ nodes: updatedGraph.nodes, links: updatedGraph.links, isDirected: updatedGraph.isDirected })
        };

        // Update the current graph with the new graph and update the list of the graphs
        graphContext.updateSelectedGraph(newGraph);
        graphContext.updateGraphs(graphContext.graphs.map((graph) => {
            if (graph.networkName !== graphContext.selectedGraph.networkName) return graph;
            else return newGraph;
        }));

        // Unselect the deleted node
        updateSelectedNode(null);
        // Update changes in local storage
        updateGraphLocalStorage(newGraph, graphContext.selectedGraph.networkName);
    }

    // Function that changes the list of node statistics when the selected node changes
    const updateNodeStatistics = useCallback(() => {
        // If a graph and a node has been selected
        if (graphContext.selectedGraph != null && selectedNode != null) {
            // Convert the selected graph to an adjacency list to get list of neighbours of the selected node
            const graph = convertToAdjList(graphContext.selectedGraph);
            const neighbours = graph.get(selectedNode.id);

            // If the selected node is connected to at least one node, compute the statistics
            if (neighbours != null) {
                dispatch({
                    clusteringCo: nodeStatisticAlgorithms.clusteringCoefficient(selectedNode.id, graph),
                    inDegree: nodeStatisticAlgorithms.inDegree(selectedNode.id, graph, graphContext.selectedGraph.isDirected),
                    outDegree: neighbours.length,
                    neighbours: neighbours,
                    nodeID: selectedNode.id
                });
            }
        }
    }, [graphContext.selectedGraph, selectedNode]);

    useEffect(() => {
        updateNodeStatistics();
    }, [updateNodeStatistics]);

    return (
        <div className={styles.subSectionWrapper} style={{ borderBottom: "none" }}>
            <h2 className="sidebarSubTitle" style={{ marginTop: "15px" }}>
                Selected Node
            </h2>
            <NodeInfo label="Node ID" value={state.nodeID} />
            <NodeInfo label="Node Type" value={graphContext.selectedGraph.nodeType} />
            <NodeInfo label="Neighbours" value={`[${state.neighbours.toString()}]`} />
            <NodeInfo label="Out-degree" value={state.outDegree} />
            <NodeInfo label="In-degree" value={state.inDegree} />
            <NodeInfo label="Clustering Co." value={state.clusteringCo} />
            <button className={`${styles.deleteNode} btn removeBtn`} onClick={deleteNode}>
                Delete node
            </button>
        </div>
    )
}

export default SelectedNode;