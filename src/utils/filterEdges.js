import { nodeTypes } from "../utils/nodeTypes";
import { graphTypes } from "./graphTypes";

// Filters edges given by the edge list CSV file to ensure that
// no invalid edges are considered when constructing the graph
export function filterEdges(edges, nodeIDType, nodes, graphType) {
    const filteredEdges = edges.filter((edge) => {
        const from = edge[0];
        const to = edge[1];

        switch (nodeIDType) {
            case nodeTypes.Integer:
                // Checks that the integer source node and target node exist within the 'nodes' set
                return nodes.has(parseInt(from, 10)) && nodes.has(parseInt(to, 10));
            case nodeTypes.String:
                // Checks that the string source node and target node exist within the 'nodes' set
                return nodes.has(from) && nodes.has(to);
            default:
                throw new Error("Invalid node type specified.");
        }
    }).map((edge) => {
        // Convert the source and target node type to an Integer if the user requested it
        if (nodeIDType === nodeTypes.Integer) return [parseInt(edge[0], 10), parseInt(edge[1], 10)];
        else return [edge[0], edge[1]];
    });

    // If the graph is directed, no need to remove duplicate edges so return the filtered edges
    if (graphType === graphTypes.Directed) {
        return filteredEdges;
    }

    // Map to store the edges of each node
    const visited = new Map([...nodes].map((x) => [x, new Set()]));

    // Remove the duplicate edges for each node
    const reducedEdges = filteredEdges.map((edge) => {
        if (visited.get(edge[0]).has(edge[1])) {
            return null;
        }

        visited.get(edge[0]).add(edge[1]);
        visited.get(edge[1]).add(edge[0]);
        return edge;
    }).filter((x) => x != null);

    return reducedEdges;
}