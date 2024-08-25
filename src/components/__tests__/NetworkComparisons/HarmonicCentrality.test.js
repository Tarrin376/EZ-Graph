import { NetworkComparisonAlgorithms } from "../../../utils/networkComparisonAlgorithms";

describe('Harmonic Centrality', () => {
    test('Empty graph', () => {
        const graph = new Map();
        expect(NetworkComparisonAlgorithms.harmonicCentrality(graph)).toEqual({});
    });

    test('Graph with two components', () => {
        const graph = new Map([
            [1, [2, 3]],
            [2, [1, 3]],
            [3, [1, 2]],
            [4, [5, 6]],
            [5, [4, 6]],
            [6, [4, 5]]
        ]);

        expect(NetworkComparisonAlgorithms.harmonicCentrality(graph)).toEqual({
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
            },
            "6": {
                "fillStyle": "#778899",
                "size": 8,
                "strokeStyle": "#778899",
                "textStyle": "#FFFFFF",
            }
        });
    });

    test('DAG of 5 nodes', () => {
        const graph = new Map([
            [1, [2, 3]],
            [2, [4]],
            [3, [5]],
            [4, []],
            [5, []]
        ]);

        expect(NetworkComparisonAlgorithms.harmonicCentrality(graph)).toEqual({
            "1": {
                "fillStyle": "#4682B4",
                "size": 12,
                "strokeStyle": "#4682B4",
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
                "fillStyle": "#778899",
                "size": 8,
                "strokeStyle": "#778899",
                "textStyle": "#FFFFFF",
            }
        });
    });
});