import { useState, useContext, useEffect } from "react";
import { convertToAdjList } from "../../../utils/convertToAdjList";
import { GraphContext } from "../../Main/Main";
import Run from "../../Run/Run";
import { runBothAlgorithms } from "../../../utils/runBothAlgorithms";
import ErrorPopUp from "../../ErrorPopUp/ErrorPopUp";

function NetworkStatistic({ label, algorithm, bothRequired }) {
    const graphContext = useContext(GraphContext);
    // Keeps track of the numerical value returned by the network statistic algorithm.
    const [statistic, setStatistic] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // Converts the graph used by the UI into an adjacency list
    // and passes it into the graph algorithm prop function.
    function runAlgorithm() {
        try {
            const graph = convertToAdjList(graphContext.selectedGraph);
            const result = bothRequired ? runBothAlgorithms(algorithm.run, graphContext.graphs) : 
            algorithm.run(graph, graphContext.selectedGraph.isDirected);

            // Show numerical result in UI.
            setStatistic(result);
        }
        catch (err) {
            setErrorMessage(err.message);
        }
    }

    useEffect(() => {
        setStatistic(null);
    }, [graphContext.selectedGraph]);

    return (
        <>
            {errorMessage !== "" &&
            <ErrorPopUp 
                errorMessage={errorMessage} 
                setErrorMessage={setErrorMessage}
            />}
            <Run
                label={label}
                moreInfo={algorithm.moreInfo}
                runAlgorithm={runAlgorithm}
                data={statistic}
            />
        </>
    )
}

export default NetworkStatistic;