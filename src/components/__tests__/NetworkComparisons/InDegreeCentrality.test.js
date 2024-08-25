import { NetworkComparisonAlgorithms } from "../../../utils/networkComparisonAlgorithms";

describe('In-degree Centrality', () => {
    test('Empty graph', () => {
        const graph = new Map();
        expect(NetworkComparisonAlgorithms.inDegreeCentrality(graph)).toEqual({});
    });

    test('Fully disconnected graph', () => {
        const graph = new Map([
            [1, []],
            [2, []],
            [3, []],
            [4, []],
            [5, []]
        ]);

        expect(NetworkComparisonAlgorithms.inDegreeCentrality(graph)).toEqual({
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
            },
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
            },
            "5": {
                "fillStyle": "#778899",
                "size": 8,
                "strokeStyle": "#778899",
                "textStyle": "#FFFFFF",
            }
        });
    });

    test('Two disconnected components in a DAG', () => {
        const graph = new Map([
            [1, [2, 3]],
            [2, []],
            [3, []],
            [4, [5, 6]],
            [5, []],
            [6, []]
        ]);

        expect(NetworkComparisonAlgorithms.inDegreeCentrality(graph)).toEqual({
            "1": {
                "fillStyle": "#778899",
                "size": 8,
                "strokeStyle": "#778899",
                "textStyle": "#FFFFFF",
            },
            "2": {
                "fillStyle": "#87CEFA",
                "size": 10,
                "strokeStyle": "#87CEFA",
                "textStyle": "#FFFFFF",
            },
            "3": {
                "fillStyle": "#87CEFA",
                "size": 10,
                "strokeStyle": "#87CEFA",
                "textStyle": "#FFFFFF",
            },
            "4": {
                "fillStyle": "#778899",
                "size": 8,
                "strokeStyle": "#778899",
                "textStyle": "#FFFFFF",
            },
            "5": {
                "fillStyle": "#87CEFA",
                "size": 10,
                "strokeStyle": "#87CEFA",
                "textStyle": "#FFFFFF",
            },
            "6": {
                "fillStyle": "#87CEFA",
                "size": 10,
                "strokeStyle": "#87CEFA",
                "textStyle": "#FFFFFF",
            }
        });
    });

    test('Fully connected graph', () => {
        const graph = new Map([
            [1, [2, 3, 4]],
            [2, [3, 1, 4]],
            [3, [4, 2, 1]],
            [4, [3, 2, 1]]
        ]);

        expect(NetworkComparisonAlgorithms.inDegreeCentrality(graph)).toEqual({
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
            },
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
        });
    });
});