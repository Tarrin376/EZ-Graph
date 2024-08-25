import { graphColours } from "./graphColours";

export function getCentralityRanks(centralities) {
    // The centrality values of every node in non-descending order
    const sortedCentralities = centralities.sort((a, b) => a[1] - b[1]);
    // The node styles for the centrality ranks
    const centralityRanks = Object.keys(graphColours.Centrality);

    const N = centralities.length;
    const M = centralityRanks.length;

    // The number of nodes that will be in each rank group
    const nodesPerRank = Math.floor(N / M);
    const ranks = {};
    let curRank = M - 1;

    for (let i = 0; i < N; i++) {
        let prev = sortedCentralities[i][1];
        let index = i;

        // Assign the nodes for a particular rank
        while (index < N && (index - i < nodesPerRank || sortedCentralities[index][1] === prev)) {
            // Index of the node's rank
            let rankIndex = Math.max(0, curRank);
            // Assign the node to the node style of their associated rank
            ranks[sortedCentralities[index][0]] = { ...graphColours.Centrality[centralityRanks[rankIndex]] };

            // Move to the next node
            prev = sortedCentralities[index][1];
            index++;
        }

        // Update the index to prevent overlapping
        i = index - 1;
        curRank--;
    }

    return ranks;
}