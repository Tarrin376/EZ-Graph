import { NetworkComparisonAlgorithms } from "./networkComparisonAlgorithms";

// Object that is used by the UI to run the associated network comparison algorithm when the
// 'run' button is clicked by the user.
export const networkComparisonsInfo = Object.freeze({
    "In-degree Centrality": {
        run: NetworkComparisonAlgorithms.inDegreeCentrality,
        moreInfo: "In-degree centrality measures the number of inbound connections to a node in a directed network. Nodes with higher in-degree centrality are more influential or important.",
    },
    "Out-degree Centrality": {
        run: NetworkComparisonAlgorithms.outDegreeCentrality,
        moreInfo: "Out-degree centrality measures the number of outbound connections from a node in a directed network. Nodes with higher out-degree centrality may have more influence over other nodes.",
    },
    "Betweenness Centrality": {
        run: NetworkComparisonAlgorithms.betweennessCentrality,
        moreInfo: "Betweenness centrality quantifies the influence of a node in controlling the flow of information between other nodes in a network. Nodes with higher betweenness centrality act as bridges or bottlenecks in the network.",
    },
    "Closeness Centrality": {
        run: NetworkComparisonAlgorithms.closenessCentrality,
        moreInfo: "Measures the proximity of a node to all others in the network, indicating its efficiency in spreading information or exerting influence due to its close connections.",
    },
    "Harmonic Centrality": {
        run: NetworkComparisonAlgorithms.harmonicCentrality,
        moreInfo: "Evaluates a node's significance by considering the sum of the reciprocals of its distances to other nodes, highlighting its central role in network connectivity and communication pathways.",
    },
    "Eigenvector Centrality": {
        run: NetworkComparisonAlgorithms.eigenvectorCentrality,
        moreInfo: "Eigenvector centrality measures the importance of a node in a network based on the concept that connections to high-scoring nodes contribute more to a node's score. Nodes with higher eigenvector centrality are connected to other important nodes.",
    },
    "Common Node ID's": {
        run: NetworkComparisonAlgorithms.commonNodeIDs,
        moreInfo: "Common node IDs measure the similarity between two networks based on the number of common nodes they share. It is useful for identifying commonalities or overlaps between different networks.",
        bothRequired: true
    },
    "SCCs": {
        run: NetworkComparisonAlgorithms.stronglyConnectedComponents,
        moreInfo: "Strongly connected components (SCCs) are subgraphs in a directed graph where every node is reachable from every other node within the subgraph. SCCs provide insights into the connectivity structure of directed networks. Each colour in the visualisation represents one strongly connected component.",
    }
});