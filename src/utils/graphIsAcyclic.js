import { convertToAdjList } from "./convertToAdjList";

export function graphIsAcyclic(graph) {
    const adjList = convertToAdjList(graph);
    const visited = new Set();

    function findCycle(node, curVis) {
        // If a cycle has been found, return true
        if (curVis.has(node)) return true;
        // If a visited node is visited, return false
        if (visited.has(node)) return false;

        visited.add(node);
        curVis.add(node);

        // Iterate over every neighbour of the current node and check if a cycle exists recursively
        for (let nextNode of adjList.get(node)) {
            const foundCycle = findCycle(nextNode, curVis);

            // If found cycle, return true
            if (foundCycle) {
                return true;
            }
        }

        // Remove node from visited path
        curVis.delete(node);
        return false;
    }

    // Determines if a cycle exists in the graph
    const foundCycle = findCycle(adjList.keys().next().value, new Set());

    // Return true if the graph doesn't have a cycle and is connected
    return !foundCycle && visited.size === adjList.size;
}