import { NetworkStatisticAlgorithms } from "../../../utils/networkStatisticAlgorithms";

describe('Jaccard Similarity', () => {
    test('Both graphs are identical', () => {
        const graph1 = new Map([
            [1, [2]],
            [2, [3]],
            [3, [1, 2]]
        ]);

        const graph2 = new Map(graph1);
        expect(NetworkStatisticAlgorithms.jaccardSimilarity(graph1, graph2)).toBe(1);
    });

    test('Both graphs have no nodes in common', () => {
        const graph1 = new Map([
            [45, [3]],
            [2, [3, 45]],
            [89, [45, 3]],
            [3, []]
        ]);

        const graph2 = new Map([
            [35, [1, 52]],
            [52, [35, 90]],
            [5, [52, 90]],
            [90, []]
        ]);

        expect(NetworkStatisticAlgorithms.jaccardSimilarity(graph1, graph2)).toBe(0);
    });

    test('Two out of the three nodes in common', () => {
        const graph1 = new Map([
            [1, [2, 4]],
            [2, [1, 4]],
            [4, [1, 2]]
        ]);

        const graph2 = new Map([
            [2, [5, 4]],
            [5, [2, 4]],
            [4, [5, 2]]
        ]);

        expect(NetworkStatisticAlgorithms.jaccardSimilarity(graph1, graph2)).toBe(0.667);
    });

    test('Both graphs are empty', () => {
        const graph1 = new Map();
        const graph2 = new Map();
        expect(NetworkStatisticAlgorithms.jaccardSimilarity(graph1, graph2)).toBe(0);
    });

    test('One graph is empty and one is not', () => {
        const graph1 = new Map([
            [6, [4, 5]],
            [4, [5]],
            [5, []]
        ]);

        const graph2 = new Map();
        expect(NetworkStatisticAlgorithms.jaccardSimilarity(graph1, graph2)).toBe(0);
    });
});