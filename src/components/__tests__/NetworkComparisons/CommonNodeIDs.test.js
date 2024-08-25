import { NetworkComparisonAlgorithms } from "../../../utils/networkComparisonAlgorithms";

describe('Common Node IDs', () => {
    test('Empty graphs', () => {
        const graph1 = new Map();
        const graph2 = new Map();
        expect(NetworkComparisonAlgorithms.commonNodeIDs(graph1, graph2)).toEqual([{}, {}]);
    });

    test('Graphs with one common node ID', () => {
        const graph1 = new Map([
            [1, [2, 3]],
            [2, [3]],
            [3, []]
        ]);

        const graph2 = new Map([
            [1, [5, 6]],
            [5, []],
            [6, []]
        ]);

        expect(NetworkComparisonAlgorithms.commonNodeIDs(graph1, graph2)).toEqual([
            {
                "1": {
                    "fillStyle": "#1E90FF",
                    "size": 8,
                    "strokeStyle": "#1E90FF",
                    "textStyle": "#FFFFFF",
                },
                "2": {
                    "fillStyle": "#778899",
                    "size": 8,
                    "strokeStyle": "#778899",
                    "textStyle": "#FFFFFF",
                },
                "3": {
                    "fillStyle": "#778899",
                    "size": 8,
                    "strokeStyle": "#778899",
                    "textStyle": "#FFFFFF",
                }
            },
            {
                "1": {
                    "fillStyle": "#1E90FF",
                    "size": 8,
                    "strokeStyle": "#1E90FF",
                    "textStyle": "#FFFFFF",
                },
                "5": {
                    "fillStyle": "#778899",
                    "size": 8,
                    "strokeStyle": "#778899",
                    "textStyle": "#FFFFFF",
                },
                "6": {
                    "fillStyle": "#778899",
                    "size": 8,
                    "strokeStyle": "#778899",
                    "textStyle": "#FFFFFF",
                }
            }
        ]);
    });

    test('No common node IDs', () => {
        const graph1 = new Map([
            [1, [2]],
            [2, []]
        ]);

        const graph2 = new Map([
            [3, [4]],
            [4, []]
        ]);

        expect(NetworkComparisonAlgorithms.commonNodeIDs(graph1, graph2)).toEqual([
            {
                "1": {
                    "fillStyle": "#778899",
                    "size": 8,
                    "strokeStyle": "#778899",
                    "textStyle": "#FFFFFF",
                },
                "2": {
                    "fillStyle": "#778899",
                    "size": 8,
                    "strokeStyle": "#778899",
                    "textStyle": "#FFFFFF",
                }
            },
            {
                "3": {
                    "fillStyle": "#778899",
                    "size": 8,
                    "strokeStyle": "#778899",
                    "textStyle": "#FFFFFF",
                },
                "4": {
                    "fillStyle": "#778899",
                    "size": 8,
                    "strokeStyle": "#778899",
                    "textStyle": "#FFFFFF",
                }
            },
        ]);
    });
});