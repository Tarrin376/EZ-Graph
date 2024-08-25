import { NetworkStatisticAlgorithms } from "../../../utils/networkStatisticAlgorithms";

describe('Average Path Length', () => {
    test('Empty graph', () => {
        const graph = new Map();
        expect(NetworkStatisticAlgorithms.avgPathLength(graph)).toBe(0);
    });

    test('Fully disconnected graph', () => {
        const graph = new Map([
            [1, []],
            [2, []],
            [3, []],
            [4, []]
        ]);

        expect(NetworkStatisticAlgorithms.avgPathLength(graph)).toBe(0);
    });

    test('Singly linked list structure graph with 5 nodes', () => {
        const graph = new Map([
            [1, [2]],
            [2, [3]],
            [3, [4]],
            [4, [5]],
            [5, []]
        ]);

        expect(NetworkStatisticAlgorithms.avgPathLength(graph)).toBe(2);
    });

    test('Fully connected graph of 5 nodes', () => {
        const graph = new Map([
            [1, [2, 3, 4, 5]],
            [2, [1, 3, 4, 5]],
            [3, [1, 2, 4, 5]],
            [4, [1, 2, 3, 5]],
            [5, [1, 2, 3, 4]]
        ]);

        expect(NetworkStatisticAlgorithms.avgPathLength(graph)).toBe(1);
    });

    test('Average case graph with 6 nodes', () => {
        const graph = new Map([
            [1, [3, 4, 5]],
            [4, [1, 2, 6]],
            [2, [4, 6]],
            [5, [1, 3]],
            [3, [6, 1, 5]],
            [6, [3, 2, 4]]
        ]);

        expect(NetworkStatisticAlgorithms.avgPathLength(graph)).toBe(1.533);
    })
});