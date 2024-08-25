import { convertToAdjList } from "./convertToAdjList";

export function runBothAlgorithms(method, graphs) {
    if (graphs.length < 2) {
        throw new Error("You must have at least 2 networks present to run this algorithm.");
    }

    // Convert both graphs to adjacency lists to allow for traversal
    const adjList1 = convertToAdjList(graphs[0]);
    const adjList2 = convertToAdjList(graphs[1]);

    // Run the algorithm on both graphs
    const result = method(adjList1, adjList2);
    return result;
}