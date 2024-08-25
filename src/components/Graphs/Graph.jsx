import ForceGraph2D from 'react-force-graph-2d';
import styles from "./Graphs.module.css";
import { GraphContext } from '../Main/Main';
import { useRef, useContext, useMemo, useEffect, useReducer } from "react";
import { updateGraphLocalStorage } from '../../utils/updateGraphLocalStorage';
import { defaultNodeStyles } from '../../utils/defaultNodeStyles';
import Toggle from 'react-toggle';
import "react-toggle/style.css"

const dagModes = Object.freeze({
    "Top-Down": "td",
    "Bottom-Up": "bu",
    "Left-Right": "lr",
    "Right-Left": "rl",
    "Radial-In": "radialin",
    "Radial-Out": "radialout",
    "None": null
});

function reducer(state, action) {
    return { ...state, ...action };
}

export default function Graph({ graph, width, height, selectedNode, updateSelectedNode }) {
    const [state, dispatch] = useReducer(reducer, {
        dagMode: graph.dagMode,
        showParticles: graph.showParticles,
        zoomToFit: graph.zoomToFit
    });

    const data = useMemo(() => {
        return {
            nodes: graph.nodes,
            links: graph.links
        }
    }, [graph.nodes, graph.links]);

    const graphContext = useContext(GraphContext);
    const graphRef = useRef(null);

    const isSelectedGraph = graph.networkName === graphContext.selectedGraph.networkName;
    const selectedStyles = isSelectedGraph ? { outline: "2px solid #1E90FF" } : {};

    // Function to update the selected graph and node when a node is clicked on
    function handleNodeClick(node) {
        graphContext.updateSelectedGraph(graph);
        updateSelectedNode(node === selectedNode ? null : node);
    }

    // Function that resets the style of the graph
    function resetGraph() {
        const updatedGraphs = graphContext.graphs.map((curGraph) => {
            // If the graph is the same as the current graph, reset the style
            if (curGraph.networkName === graph.networkName) {
                return {
                    ...curGraph,
                    styles: Object.fromEntries(new Map(Object.keys(curGraph.styles).map((node) => {
                        return [
                            node,
                            { ...defaultNodeStyles }
                        ]
                    })))
                }
            }

            return curGraph;
        });

        graphContext.updateGraphs(updatedGraphs);
    }

    // Function thats allows the user to download their graph in JSON format
    function downloadGraph() {
        let graphData = {
            ...graph,
            zoomToFit: state.zoomToFit,
            showParticles: state.showParticles,
            links: graph.links.map((x) => { return { source: x.source.id, target: x.target.id }}),
            nodes: graph.nodes.map((node) => { return { id: node.id }}),
        };

        if (state.dagMode !== undefined) {
            graphData = {
                ...graphData, 
                dagMode: state.dagMode
            }
        }

        // Convert graph to JSON string
        const jsonData = JSON.stringify(graphData);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create anchor element and programmatically click it to downloaded graph.json
        const anchor = document.createElement('a');
        anchor.download = 'graph.json';
        anchor.href = url;
        anchor.click();

        URL.revokeObjectURL(url);
    }

    // Function thats updates the DAG mode option for the graph
    function updateDagMode(e) {
        const mode = e.target.value;
        updateGraphLocalStorage({ dagMode: mode }, graph.networkName);
        dispatch({ dagMode: mode });
    }

    // Function that toggles the 'show particles' option
    function toggleShowParticles(e) {
        const checked = e.target.checked;
        updateGraphLocalStorage({ showParticles: checked }, graph.networkName);
        dispatch({ showParticles: checked });
    }

    // Function that toggles the 'zoom to fit' option
    function toggleZoomToFit(e) {
        const checked = e.target.checked;
        updateGraphLocalStorage({ zoomToFit: checked }, graph.networkName);
        dispatch({ zoomToFit: checked });
    }
    
    function handleDrawNode(node, ctx, globalScale) {
        const label = node.id;

        // Draw the background circle with a larger radius
        ctx.beginPath();
        ctx.arc(node.x, node.y, graph.styles[node.id].size * 1.05, 0, 2 * Math.PI);
        ctx.fillStyle = '#F0F2F4'; // Change color as needed
        ctx.fill();

        // Draw the node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, graph.styles[node.id].size, 0, 2 * Math.PI);
        ctx.fillStyle = selectedNode === node ? '#e43131' : graph.styles[node.id].fillStyle;
        ctx.fill();
        ctx.strokeStyle = selectedNode === node ? '#e43131' : graph.styles[node.id].strokeStyle; // Node border color
        ctx.lineWidth = 1 / globalScale;
        ctx.stroke();

        // Draw label
        ctx.font = `${graph.styles[node.id].size / 1.3}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = selectedNode === node ? 'white' : graph.styles[node.id].textStyle; // Label color
        ctx.fillText(label, node.x, node.y);
        ctx.isPointInPath(node.x, node.y);
    }

    // Function that allows the user to drag a node to a different position
    function dragNode(node) {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
    }

    useEffect(() => {
        if (graphRef.current) {
            graphRef.current.d3Force('charge').distanceMax(300);
        }
    }, [graphRef]);

    return (
        <div className={styles.wrapper} style={selectedStyles}>
            <div className={styles.graphOptions}>
                <p className={styles.networkName} style={isSelectedGraph ? { textDecoration: "underline" } : {}}>
                    {`Network Name: ${graph.networkName}`}
                </p>
                <div className={styles.btnActions}>
                    <button className={`${styles.btnAction} primaryBtn`} onClick={resetGraph}>
                        Reset
                    </button>
                    <button className={`${styles.btnAction} ${styles.downloadBtn} primaryBtn`} onClick={downloadGraph}>
                        Download
                    </button>
                </div>
                {graph.isDAG && <div className={styles.graphStyle}>
                    <p>DAG Mode:</p>
                    <select className={styles.graphStylesDropdown} defaultValue={state.dagMode} onChange={updateDagMode}>
                        {Object.keys(dagModes).map((mode, index) => {
                            return (
                                <option key={index} value={mode}>
                                    {mode}
                                </option>
                            )
                        })}
                    </select>
                </div>}
                <div className={styles.checkBox}>
                    <label htmlFor="show-particles">Show link particles</label>
                    <Toggle
                        id="show-particles"
                        defaultChecked={state.showParticles}
                        onChange={toggleShowParticles} 
                    />
                </div>
                <div className={styles.checkBox} style={{ marginTop: "10px" }}>
                    <label htmlFor="zoom-to-fit">Zoom to fit</label>
                    <Toggle
                        id="zoom-to-fit"
                        defaultChecked={state.zoomToFit}
                        onChange={toggleZoomToFit} 
                    />
                </div>
            </div>
            <ForceGraph2D
                width={width}
                height={height}
                ref={graphRef}
                linkWidth={2}
                linkDirectionalArrowLength={graph.isDirected ? 5 : undefined}
                nodeCanvasObject={handleDrawNode}
                linkCurvature={0.20}
                onNodeClick={handleNodeClick}
                cooldownTicks={state.zoomToFit ? 100 : undefined}
                onEngineStop={state.zoomToFit ? () => graphRef.current.zoomToFit(400) : undefined}
                linkDirectionalParticleColor={() => "#1E90FF"}
                linkDirectionalArrowColor={() => "#1E90FF"}
                linkDirectionalParticles={state.showParticles ? 3 : undefined}
                linkDirectionalParticleWidth={state.showParticles ? 3 : undefined}
                dagMode={dagModes[state.dagMode]}
                onNodeDragEnd={dragNode}
                graphData={data}
            />
        </div>
    )
}