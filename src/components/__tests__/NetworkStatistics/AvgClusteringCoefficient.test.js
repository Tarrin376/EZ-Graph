import { NetworkStatisticAlgorithms } from "../../../utils/networkStatisticAlgorithms";

describe('Average Clustering Coefficient', () => {
    test('Fully connected graph', () => {
        const graph = new Map([
            [1, [2, 3, 4]],
            [2, [1, 3, 4]],
            [3, [1, 2, 4]],
            [4, [1, 2, 3]]
        ]);

        expect(NetworkStatisticAlgorithms.avgClusteringCoefficient(graph)).toBe(1);
    });

    test('Fully disconnected graph', () => {
        const graph = new Map([
            [1, []],
            [2, []],
            [3, []],
            [4, []]
        ]);

        expect(NetworkStatisticAlgorithms.avgClusteringCoefficient(graph)).toBe(0);
    });

    test('Empty graph', () => {
        const graph = new Map();
        expect(NetworkStatisticAlgorithms.avgClusteringCoefficient(graph)).toBe(0);
    });

    test('Two strongly connected components of size 3', () => {
        const graph = new Map([
            [1, [2, 3]],
            [2, [1, 3]],
            [3, [1, 2]],
            [4, [5, 6]],
            [5, [4, 6]],
            [6, [4, 5]]
        ]);

        expect(NetworkStatisticAlgorithms.avgClusteringCoefficient(graph)).toBe(1);
    });

    test('Graph of 4 nodes connected like a square with the diagonals also connected (one way connections)', () => {
        const graph = new Map([
            [1, [2, 3]],
            [2, [3, 4]],
            [3, [4]],
            [4, []]
        ]);

        expect(NetworkStatisticAlgorithms.avgClusteringCoefficient(graph)).toBe(0.25);
    });
});