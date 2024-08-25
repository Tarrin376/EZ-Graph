import { getCentralityRanks } from "./getCentralityRanks";
import { graphColours } from "./graphColours";
import { sccColours } from "./sccColours";

export class NetworkComparisonAlgorithms {
    static outDegreeCentrality(graph) {
        // Compute the out-degree of every node in the graph
        const outDegrees = Array.from(graph.keys())
        .map((node) => [node, graph.get(node).length]);
        
        // Return the result after ranking the nodes based on their out-degree values
        return getCentralityRanks(outDegrees);
    }

    static inDegreeCentrality(graph) {
        // in-degree centrality = number of edges that point to the node
        const nodes = new Map(Array.from(graph.keys()).map((node) => [node, 0])); // create a map of nodes with a value of 0

        for (let node of graph.keys()) {
            for (let neighbour of graph.get(node)) {
                const count = nodes.get(neighbour);
                // increment the count of the neighbour
                nodes.set(neighbour, count + 1);
            }
        }

        // Compute the in-degree of every node in the graph
        const inDegrees = Array.from(graph.keys())
        .map((node) => [node, nodes.get(node)]);

        // Return the result after ranking the nodes based on their in-degree values
        return getCentralityRanks(inDegrees);
    }

    static betweennessCentrality(graph) {
        // create a map of nodes with their betweenness centrality
        const betweenness = new Map();
        const nodes = Array.from(graph.keys());
        
        // initialize the betweenness centrality of each node to 0
        nodes.forEach(node => betweenness.set(node, 0));
        nodes.forEach(node => {
            const dependencies = new Map(); 
            const numShortestPaths = new Map();
            const distance = new Map();
            const predecessors = new Map();

            // for each node in the graph that is not the current node
            nodes.filter(n => n !== node).forEach(n => {
                // initialize the dependencies of the node to an empty array
                dependencies.set(n, []);
                // initialize the number of shortest paths of the node to 0
                numShortestPaths.set(n, 0);
                // initialize the distance of the node to -1
                distance.set(n, -1);
                // initialize the predecessors of the node to an empty array
                predecessors.set(n, []);
            });
            
            const queue = [node];
            const stack = [];

            // set the distance of the current node to 0
            distance.set(node, 0);
            // set the number of shortest paths of the current node to 1
            numShortestPaths.set(node, 1);

            while (queue.length > 0) {
                const currentNode = queue.shift();
                stack.push(currentNode);
                const adjList = graph.get(node);

                for(let i = 0; i <= adjList.length; i++) {
                    if (distance.get(adjList[i]) < 0) {
                        // add the neighbour to the queue
                        queue.push(adjList[i]);
                        // set the distance of the neighbour to the distance of the current node + 1
                        distance.set(adjList[i], distance.get(currentNode) + 1);
                    }

                    if (distance.get(adjList[i]) === distance.get(currentNode) + 1) {
                        // increment the number of shortest paths of the neighbour by the number of shortest paths of the current node
                        numShortestPaths.set(adjList[i], numShortestPaths.get(adjList[i]) + numShortestPaths.get(currentNode));
                        // add the current node to the predecessors of the neighbour
                        predecessors.get(adjList[i]).push(currentNode); 
                    }
                }
            }

            while (stack.length > 0) {
                const currentNode = stack.pop(); 
                // iterate over the keys of the predecessors map
                for (let predecessor of predecessors.keys(currentNode)) {
                    // calculate the dependency of the current node
                    const dependency = (numShortestPaths.get(predecessor) / numShortestPaths.get(currentNode)) * (1 + dependencies.get(currentNode));
                    // increment the dependency of the predecessor by the dependency of the current node
                    dependencies.set(predecessor, dependencies.get(predecessor) + dependency);
                }

                if (currentNode !== node) {
                    // increment the betweenness centrality of the current node by the dependency of the current node
                    betweenness.set(currentNode, betweenness.get(currentNode) + dependencies.get(currentNode));
                }
            }
        });

        // Get the betweenness centrality of every node in the graph
        const centralities = Array.from(graph.keys()).map((node) => [node, betweenness.get(node)]);

        // Return the result after ranking the nodes based on their centrality values
        return getCentralityRanks(centralities); 
    }

    static closenessCentrality(graph) {
        // Gets the closeness centrality of a node
        function getNodeClosenessCentrality(node) {
            const queue = [[node, 0]];
            let sumGeoDist = 0;

            const visited = new Set();
            visited.add(node);

            while (queue.length > 0) {
                const curNode = queue.shift();
                
                for (let neighbour of graph.get(curNode[0])) {
                    // If node has not been visited, visit node and add distance from src node to this node to 'sumGeoDist'
                    if (!visited.has(neighbour)) {
                        const dist = curNode[1] + 1;
                        queue.push([neighbour, dist]);
                        visited.add(neighbour);
                        sumGeoDist += dist;
                    }
                }
            }

            // Return reciprocal of the sum of distances to every other node in the graph
            return 1 / sumGeoDist;
        }

        // Compute all of the closeness centrality values for every node
        const centralities = Array.from(graph.keys())
        .map((node) => [node, getNodeClosenessCentrality(node)]);

        // Return the result after ranking the nodes based on their centrality values
        return getCentralityRanks(centralities); 
    }

    static harmonicCentrality(graph) {
        function getNodeHarmonicCentrality(node) {
            const queue = [[node, 0]];
            let sumDist = 0;

            const visited = new Set();
            visited.add(node);

            while (queue.length > 0) {
                const curNode = queue.shift();

                for (let neighbour of graph.get(curNode[0])) {
                    // If node has not been visited, visit node and add the reciprocal of the distance from src node to this node to 'sumGeoDist'
                    if (!visited.has(neighbour)) {
                        const dist = curNode[1] + 1;
                        queue.push([neighbour, dist]);
                        visited.add(neighbour);
                        sumDist += 1 / dist;
                    }
                }
            }

            // Return sum of reciprocal distances to every other node in the graph
            return sumDist;
        }

        // Compute all of the closeness centrality values for every node
        const centralities = Array.from(graph.keys())
        .map((node) => [node, getNodeHarmonicCentrality(node)]);

        // Return the result after ranking the nodes based on their centrality values
        return getCentralityRanks(centralities);
    }

    static eigenvectorCentrality(graph, maxIterations = 100, tolerance = 1e-6) {
        const numNodes = graph.adjMatrix.length;
        let centrality = new Array(numNodes).fill(1);

        for (let iter = 0; iter < maxIterations; iter++) {
            // Previous centrality values for every node
            const prevCentrality = centrality.slice();

            // Update the centrality values for every node
            centrality = graph.adjMatrix.map((row) => row.reduce((sum, cur, i) => sum + cur * prevCentrality[i]));
            const norm = Math.sqrt(centrality.reduce((sum, val) => sum + val * val, 0));
            // Normalise the centrality values
            centrality = centrality.map(val => val / norm);

            // The maximum change between every node's new centrality value and their previous centrality value
            const maxChange = Math.max(centrality.map((val, i) => Math.abs(val - prevCentrality[i])));

            // If this maximum change is less than the tolerance, stop
            if (maxChange < tolerance) {
                break;
            }
        }

        // Get all of the eigenvector centrality values for every node
        const centralities = Array.from(graph.nodeIndices.keys())
        .map((node) => [node, centrality[graph.nodeIndices.get(node)]]);

        // Return the result after ranking the nodes based on their centrality values
        return getCentralityRanks(centralities);
    }

    static commonNodeIDs(graph1, graph2) {
        const nodes1 = new Set(graph1.keys());
        const nodes2 = new Set(graph2.keys());
        const commonNodes = new Set();

        // Find the intersection of the two node sets
        for (let node of nodes1) {
            if (nodes2.has(node)) {
                commonNodes.add(node);
            }
        }

        function getStyles(nodes) {
            return Object.fromEntries(new Map([...nodes].map((node) => {
                const style = commonNodes.has(node) ? graphColours["Common Node ID's"]["Found"] : graphColours["Common Node ID's"]["Not Found"];
                return [
                    node,
                    {
                        ...style,
                        size: 8
                    }
                ]
            })));
        }

        // Compute the styles for each node in both graphs to highlight common nodes found
        return [getStyles(nodes1), getStyles(nodes2)];
    }

    static stronglyConnectedComponents(graph) {
        const nodes = Array.from(graph.keys());
        const ids = new Map(nodes.map((node) => [node, -1]));
        const lowLinks = new Map();
        const visited = new Set();
        const sccs = new Map();

        let sccCount = 0;
        let id = 0;
        let stack = [];

        function tarjansAlgorithm(node) {
            let newID = id++;
            // Update the new low link value
            lowLinks.set(node, newID);
            // Update the ID of the node
            ids.set(node, newID);
            
            stack.unshift(node);
            visited.add(node);
    
            for (let neighbour of graph.get(node)) {
                // If the neighbour has not got an assigned id, visit
                if (ids.get(neighbour) === -1) {
                    tarjansAlgorithm(neighbour);
                }
                
                // If the neighbour is visit, update its low link value
                if (visited.has(neighbour)) {
                    lowLinks.set(node, Math.min(lowLinks.get(node), lowLinks.get(neighbour)));
                }
            }
            
            // The the id of the node is equal to its low link value, remove all nodes part of the SCC from the stack
            if (ids.get(node) === lowLinks.get(node)) {
                while (stack.length > 0) {
                    const removed = stack.shift();
                    // Assign the node with its associated SCC
                    sccs.set(removed, sccCount);
                    // Remove node from visited set
                    visited.delete(removed);
                    
                    // If the current node is equal to the start node, SCC has been fully explored so break
                    if (removed === node) {
                        break;
                    }
                }

                // Update SCC count for next SCC
                sccCount++;
            }
        }

        // Explore every node and find its SCC
        for (let node of nodes) {
            if (ids.get(node) === -1) {
                tarjansAlgorithm(node);
            }
        }

        // Get all of the SCC found in the graph
        const uniqueSCCs = new Set(Array.from(sccs.values()).sort());
        // Map each SCC to an associated colour
        const colourMappings = new Map([...uniqueSCCs].map((x, index) => [x, sccColours[index % sccColours.length]]));

        // Return the styles of each node
        return Object.fromEntries(new Map(nodes.map((node) => {
            // The colour of the SCC that the node belongs to
            const colour = colourMappings.get(sccs.get(node));
            return [
                node,
                {
                    "fillStyle": colour,
                    "strokeStyle": colour,
                    "textStyle": "#FFFFFF",
                    "size": 8
                }
            ]
        })));
    }
}
