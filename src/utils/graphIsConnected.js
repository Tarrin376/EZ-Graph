import { convertToAdjList } from "./convertToAdjList";
import { NetworkStatisticAlgorithms } from "./networkStatisticAlgorithms";

// Checks if the graph is connected or not
export function graphIsConnected(graph) {
    const adjList = convertToAdjList(graph);
    // Get the number of components contained within the graph
    const numComponents = NetworkStatisticAlgorithms.connectedComponents(adjList, graph.isDirected);
    // Return true if the number of components is 1 (connected graph), otherwise false
    return numComponents === 1;
}