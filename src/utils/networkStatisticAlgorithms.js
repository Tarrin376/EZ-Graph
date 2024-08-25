import { constructUndirectedGraph } from "./constructUndirectedGraph";
import { nodeStatisticAlgorithms } from "./nodeStatisticAlgorithms";

export class NetworkStatisticAlgorithms {
    // Calculates the average clustering coefficient of the graph
    // using the local clustering coefficient method.
    static avgClusteringCoefficient(graph) {
        if (graph.size === 0) {
            return 0;
        }

        let clusteringSum = 0;
        for (let node of graph.keys()) {
            // The clustering coefficient of the node
            const clusteringCo = nodeStatisticAlgorithms.clusteringCoefficient(node, graph);
            // Add the clustering coefficient of the node to the sum
            clusteringSum += clusteringCo;
        }
        
        // Calculate the average clustering coefficient by dividing by the number of nodes.
        const avgClusteringCo = clusteringSum / graph.size;

        // Round to 3 d.p
        return Math.round((avgClusteringCo + Number.EPSILON) * 1000) / 1000;
    }

    static avgPathLength(graph) {
        if (graph.size === 0) {
            return 0;
        }
        
        let componentCount = 0;
        let sumLengths = 0;
        const visited = new Set();
        
        function getAvgLength(nodes) {
            let numPaths = 0;
            let sumPaths = 0;

            for (let node of nodes) {
                const queue = [[node, 0]];
                const curVisited = new Set();
                curVisited.add(node);

                while (queue.length > 0) {
                    const [curNode, dist] = queue.shift();

                    for (let neighbour of graph.get(curNode)) {
                        if (!curVisited.has(neighbour)) {
                            // Mark neighbour as visited and add to queue so it can be processed next.
                            curVisited.add(neighbour);
                            // Add neighbour to queue to be processed, keeping track of its distance
                            queue.push([neighbour, dist + 1]);
                            // Add the distance from the start node to the neighbour to 'sumPaths'
                            sumPaths += dist + 1;
                            // Increment the number of paths found
                            numPaths++;
                        }
                    }
                }
            }
            
            // Prevent divide by zero error, return 0 if 'numPaths' is equal to 0, otherwise the average path length of the component
            return numPaths === 0 ? 0 : sumPaths / numPaths;
        }

        for (let node of graph.keys()) {
            // If node hasnt been visited, visit the component that the node is contained within
            if (!visited.has(node)) {
                const nodes = NetworkStatisticAlgorithms.visitComponent(node, visited, graph);
                // Find the average path length in the component and add to 'sumLengths'
                sumLengths += getAvgLength(nodes);
                componentCount++;
            }
        }

        // Compute the average path
        const avg = sumLengths / componentCount;

        // Round to 3 d.p
        return Math.round((avg + Number.EPSILON) * 1000) / 1000;
    }

    // Determines the density of the graph by calculating
    // the ratio of the number of edges to the number of
    // possible edges that could exist within the graph.
    static networkDensity(graph) {
        const numNodes = graph.size;
        let numEdges = 0;

        // Iterate over every node and add its degree to 'numEdges'
        for (let node of graph.keys()) {
            const degree = graph.get(node).length;
            numEdges += degree;
        }

        // Formula that works for both directed and undirected graphs.
        const density = numEdges / (numNodes * (numNodes - 1));

        // Round to 3 d.p
        return Math.round((density + Number.EPSILON) * 1000) / 1000;
    }

    // Calculates the longest shortest path between all pairs
    // of nodes in the graph. This determines the 'diameter' of the
    // graph.
    static networkDiameter(graph) {
        let diameter = 0;

        // Find the longest path from the node to any other node in the graph
        function findBestDiameter(node) {
            const queue = [[node, 0]];
            let bestDiameter = 0;

            const visited = new Set();
            visited.add(node);

            while (queue.length > 0) {
                const [curNode, dist] = queue.shift();
                // Update the maximum path
                bestDiameter = Math.max(bestDiameter, dist);

                for (let neighbour of graph.get(curNode)) {
                    if (!visited.has(neighbour)) {
                        // Mark node as visited and add to queue so it can be processed next.
                        visited.add(neighbour);
                        queue.push([neighbour, dist + 1]);
                    }
                }
            }

            return bestDiameter;
        }

        // Compute the longest path for every node and determine the largest one
        for (let node of graph.keys()) {
            const bestDiameter = findBestDiameter(node);
            diameter = Math.max(diameter, bestDiameter);
        }

        return diameter;
    }

    // Visits the component of the graph by marking each node as visited.
    static visitComponent(node, visited, graph) {
        const queue = [node];
        const nodes = [node];
        visited.add(node);

        while (queue.length > 0) {
            const curNode = queue.shift();
            for (let neighbour of graph.get(curNode)) {
                if (!visited.has(neighbour)) {
                    // Mark node as visited and add to queue so it can be processed next.
                    visited.add(neighbour);
                    queue.push(neighbour);
                    nodes.push(neighbour);
                }
            }
        }

        return nodes;
    }

    // Computes the number of connected components within the graph
    // using a Breadth-First search.
    static connectedComponents(graph, isDirected) {
        // To keep the algorithm the same for both graph types, convert to undirected graph.
        if (isDirected) {
            graph = constructUndirectedGraph(graph);
        }
        
        // Stores the nodes that have been visited during the graph traversal.
        const visited = new Set();
        // Number of connected components within the graph.
        let components = 0;

        for (let node of graph.keys()) {
            // If this is a new component, explore it.
            if (!visited.has(node)) {
                NetworkStatisticAlgorithms.visitComponent(node, visited, graph);
                components++;
            }
        }

        return components;
    }

    // Computes the average degree of all nodes within the graph.
    static avgDegree(graph) {
        let degreeSum = 0;

        // Sum up all of the degrees of each node in the graph
        for (let node of graph.keys()) {
            degreeSum += graph.get(node).length;
        }
        
        // Compute the average degree of a node
        const avgDegree = degreeSum / graph.size;

        // Round to 3 d.p
        return Math.round((avgDegree + Number.EPSILON) * 1000) / 1000;
    }

    static jaccardSimilarity(graph1, graph2) {
        const nodes1 = new Set(graph1.keys());
        const nodes2 = new Set(graph2.keys());
        let common = 0;

        // Count the number of nodes in common between the two graphs
        for (let node of nodes1) {
            if (nodes2.has(node)) {
                common += 2;
            }
        }

        const totalSize = nodes1.size + nodes2.size;
        if (totalSize === 0) {
            return 0;
        }
        
        // Compute the jaccard similarity of the graphs
        const jaccard = common / totalSize;

        // Round to 3 d.p
        return Math.round((jaccard + Number.EPSILON) * 1000) / 1000;
    }
}