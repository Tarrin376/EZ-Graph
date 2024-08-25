import Run from "../../Run/Run";
import { networkComparisonsInfo } from "../../../utils/networkComparisonsInfo";
import RunWrapper from "../../../wrappers/RunWrapper/RunWrapper";
import { useContext, useState } from "react";
import { GraphContext } from "../../Main/Main";
import { convertToAdjList } from "../../../utils/convertToAdjList";
import { graphIsConnected } from "../../../utils/graphIsConnected";
import ErrorPopUp from "../../ErrorPopUp/ErrorPopUp";
import { convertToAdjMatrix } from "../../../utils/convertToAdjMatrix";
import { runBothAlgorithms } from "../../../utils/runBothAlgorithms";

function CompareNetworks() {
    const graphContext = useContext(GraphContext);
    const [errorMessage, setErrorMessage] = useState("");

    // Function that visualises the comparison algorithms between all graphs that the user has uploaded
    function runNetworkComparisonAlgorithm(method, name, bothRequired) {
        try {
            // If both graphs are required as input, run the algorithm on 'runBothAlgorithms', otherwise, 
            // run the comparison algorithm on every graph in the 'graphs' list
            const result = bothRequired ? runBothAlgorithms(method, graphContext.graphs) : graphContext.graphs.map((graph) => {
                if (name === "Closeness Centrality" && (!graphIsConnected(graph) || graph.isDirected)) {
                    throw new Error("Networks must be both undirected and connected to run the Closeness Centrality algorithm.");
                } else if (name === "SCCs" && !graph.isDirected) {
                    throw new Error("Networks must be directed to run the Strongly Connected Components algorithm.");
                }

                const graphConverted = name === "Eigenvector Centrality" ? convertToAdjMatrix(graph) : convertToAdjList(graph);
                return method(graphConverted);
            });
            
            // Update the styles of the graphs to show visualisation
            graphContext.updateGraphs(graphContext.graphs.map((graph, index) => {
                return {
                    ...graph,
                    styles: { ...result[index] }
                }
            }));
        }
        catch (err) {
            setErrorMessage(err.message);
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
                Compare
            </h2>
            <RunWrapper>
                {Object.keys(networkComparisonsInfo).map((x) => {
                    return (
                        <Run
                            label={x}
                            moreInfo={networkComparisonsInfo[x].moreInfo}
                            runAlgorithm={() => runNetworkComparisonAlgorithm(networkComparisonsInfo[x].run, x, networkComparisonsInfo[x].bothRequired)}
                            key={x}
                        />
                    )
                })}
            </RunWrapper>
        </>
    )
}

export default CompareNetworks;