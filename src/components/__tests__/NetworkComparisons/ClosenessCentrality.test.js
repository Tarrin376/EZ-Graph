import { NetworkComparisonAlgorithms } from "../../../utils/networkComparisonAlgorithms";

describe('Closeness Centrality', () => {
    test('Empty graph', () => {
        const graph = new Map();
        expect(NetworkComparisonAlgorithms.closenessCentrality(graph)).toEqual({});
    });

    test('Fully connected graph', () => {
        const graph = new Map([
            [1, [2, 3]],
            [2, [1, 3]],
            [3, [1, 2]]
        ]);

        expect(NetworkComparisonAlgorithms.closenessCentrality(graph)).toEqual({
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
            }
        });
    });

    test('DAG with one level', () => {
        const graph = new Map([
            [1, [2, 3, 4, 5, 6]],
            [2, []],
            [3, []],
            [4, []],
            [5, []],
            [6, []]
        ]);

        expect(NetworkComparisonAlgorithms.closenessCentrality(graph)).toEqual({
            "1": {
                "fillStyle": "#778899",
                "size": 8,
                "strokeStyle": "#778899",
                "textStyle": "#FFFFFF"
            },
            "2": {
                "fillStyle": "#87CEFA",
                "size": 10,
                "strokeStyle": "#87CEFA",
                "textStyle": "#FFFFFF"
            },
            "3": {
                "fillStyle": "#87CEFA",
                "size": 10,
                "strokeStyle": "#87CEFA",
                "textStyle": "#FFFFFF"
            },
            "4": {
                "fillStyle": "#87CEFA",
                "size": 10,
                "strokeStyle": "#87CEFA",
                "textStyle": "#FFFFFF"
            },
            "5": {
                "fillStyle": "#87CEFA",
                "size": 10,
                "strokeStyle": "#87CEFA",
                "textStyle": "#FFFFFF"
            },
            "6": {
                "fillStyle": "#87CEFA",
                "size": 10,
                "strokeStyle": "#87CEFA",
                "textStyle": "#FFFFFF"
            }
        });
    })
});