
// Converts a graph represented in an adjacency list to a adjacency matrix
export function convertToAdjMatrix(graph) {
    const nodes = graph.nodes.map((node) => node.id);
    // A map containing the key value pairs of each node with its associated index
    const nodeIndices = new Map(nodes.map((node, index) => [node, index]));

    const numNodes = nodes.length;
    const adjMatrix = Array.from({ length: numNodes }, () => Array(numNodes).fill(0));

    for (let link of graph.links) {
        // Index of the source node
        const fromIndex = nodeIndices.get(link.source.id);
        // Index of the target node
        const toIndex = nodeIndices.get(link.target.id);
        // Set the edge between these nodes to 1
        adjMatrix[fromIndex][toIndex] = 1;
    }
    
    return {
        adjMatrix: adjMatrix,
        nodeIndices: nodeIndices
    }
}