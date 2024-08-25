import useWindowSize from "../../hooks/useWindowSize";
import styles from "./Graphs.module.css";
import Graph from "./Graph";

export default function Graphs({ graphs, selectedNode, updateSelectedNode, canvasOffset }) {
    const [windowWidth, windowHeight] = useWindowSize();

    return (
        <div className={styles.graphs} style={{ width: `${windowWidth - canvasOffset}px` }}>
            {graphs.map((graph) => {
                return (
                    <Graph 
                        graph={graph}
                        width={(windowWidth - canvasOffset) / graphs.length}
                        height={windowHeight}
                        selectedNode={selectedNode}
                        updateSelectedNode={updateSelectedNode}
                        key={graph.networkName}
                    />
                )
            })}
        </div>
    )
}