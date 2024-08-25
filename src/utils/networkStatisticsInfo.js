import { NetworkStatisticAlgorithms } from "./networkStatisticAlgorithms";

// Object that is used by the UI to run the associated network statistic algorithm when the
// 'run' button is clicked by the user.
export const networkStatisticsInfo = Object.freeze({
    "Avg. Clustering Co.": {
        run: NetworkStatisticAlgorithms.avgClusteringCoefficient,
        moreInfo: "Average clustering coefficient measures the degree to which nodes in a graph tend to cluster together. It quantifies the density of triangles in the graph, indicating the extent of local connectivity.",
    },
    "Avg. Path Length": {
        run: NetworkStatisticAlgorithms.avgPathLength,
        moreInfo: "Average path length calculates the average shortest path between all pairs of nodes in a graph. It provides insights into the overall efficiency or navigability of the network.",
    },
    "Network Density": {
        run: NetworkStatisticAlgorithms.networkDensity,
        moreInfo: "Network density quantifies the proportion of edges in a graph compared to the total possible number of edges. It indicates how densely connected the nodes are in the graph.",
    },
    "Network Diameter": {
        run: NetworkStatisticAlgorithms.networkDiameter,
        moreInfo: "Network diameter calculates the longest shortest path (i.e., maximum distance) between any pair of nodes in the graph. It provides a measure of the network's overall size or extent.",
    },
    "Connected Components": {
        run: NetworkStatisticAlgorithms.connectedComponents,
        moreInfo: "Connected components are subgraphs in the graph where all nodes are reachable from each other. They reveal the connectivity structure of the graph and the presence of isolated clusters.",
    },
    "Avg. Degree": {
        run: NetworkStatisticAlgorithms.avgDegree,
        moreInfo: "Average degree measures the average number of edges incident to each node in the graph. It provides insights into the overall connectivity or centrality of nodes in the network.",
    },
    "Jaccard Similarity": {
        run: NetworkStatisticAlgorithms.jaccardSimilarity,
        moreInfo: "Jaccard similarity measures the similarity between two sets based on the ratio of the intersection to the union of the sets. In network analysis, it quantifies the similarity between two sets of nodes in different networks.",
        bothRequired: true
    },
});