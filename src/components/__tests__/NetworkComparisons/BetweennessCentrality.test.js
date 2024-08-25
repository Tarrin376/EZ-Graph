import { NetworkComparisonAlgorithms } from "../../../utils/networkComparisonAlgorithms";

describe('Betweenness Centrality', () => {
    test('Empty graph', () => {
        const graph = new Map();
        expect(NetworkComparisonAlgorithms.betweennessCentrality(graph)).toEqual({});
    });

    test('Fully connected graph', () => {
        const graph = new Map([
            [1, [2, 3]],
            [2, [1, 3]],
            [3, [1, 2]]
        ]);

        expect(NetworkComparisonAlgorithms.betweennessCentrality(graph)).toEqual({
            "1": {
                "fillStyle": "#4682B4",
                "size": 12,
                "strokeStyle": "#4682B4",
                "textStyle": "#FFFFFF"
            },
            "2": {
                "fillStyle": "#87CEFA",
                "size": 10,
                "strokeStyle": "#87CEFA",
                "textStyle": "#FFFFFF"
            },
            "3": {
                "fillStyle": "#778899",
                "size": 8,
                "strokeStyle": "#778899",
                "textStyle": "#FFFFFF"
            }
        });
    });

    test('Fully disconnected graph', () => {
        const graph = new Map([
            [1, []],
            [2, []],
            [3, []],
            [4, []]
        ]);

        expect(NetworkComparisonAlgorithms.betweennessCentrality(graph)).toEqual({
            "1": {
                "fillStyle": "#778899",
                "size": 8,
                "strokeStyle": "#778899",
                "textStyle": "#FFFFFF"
            },
            "2": {
                "fillStyle": "#778899",
                "size": 8,
                "strokeStyle": "#778899",
                "textStyle": "#FFFFFF"
            },
            "3": {
                "fillStyle": "#778899",
                "size": 8,
                "strokeStyle": "#778899",
                "textStyle": "#FFFFFF"
            },
            "4": {
                "fillStyle": "#778899",
                "size": 8,
                "strokeStyle": "#778899",
                "textStyle": "#FFFFFF"
            }
        });
    });
});