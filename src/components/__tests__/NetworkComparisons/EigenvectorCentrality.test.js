import { NetworkComparisonAlgorithms } from "../../../utils/networkComparisonAlgorithms";

describe('Eigenvector Centrality', () => {
    test('Empty graph', () => {
        const graph = {
            adjMatrix: [],
            nodeIndices: []
        };

        expect(NetworkComparisonAlgorithms.eigenvectorCentrality(graph)).toEqual({});
    });

    test('Fully connected graph', () => {
        const graph = {
            adjMatrix: [[0, 1, 1], [1, 0, 1], [1, 1, 0]],
            nodeIndices: new Map([
                [1, 0],
                [2, 1],
                [3, 2]
            ])
        };

        expect(NetworkComparisonAlgorithms.eigenvectorCentrality(graph)).toEqual({
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
            }
        });
    });

    test('Avg case graph', () => {
        const graph = {
            adjMatrix: [[0, 0, 1, 1], [1, 0, 0, 1], [1, 1, 0, 0], [1, 1, 0, 0]],
            nodeIndices: new Map([
                [1, 0],
                [2, 1],
                [3, 2],
                [4, 3]
            ])
        };

        expect(NetworkComparisonAlgorithms.eigenvectorCentrality(graph)).toEqual({
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
                "fillStyle": "#87CEFA",
                "size": 10,
                "strokeStyle": "#87CEFA",
                "textStyle": "#FFFFFF",
            }
        });
    })
});