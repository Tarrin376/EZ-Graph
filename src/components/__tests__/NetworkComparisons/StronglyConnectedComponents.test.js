import { NetworkComparisonAlgorithms } from "../../../utils/networkComparisonAlgorithms";

describe('Strongly Connected Components', () => {
    test('Empty graph', () => {
        const graph = new Map();
        expect(NetworkComparisonAlgorithms.stronglyConnectedComponents(graph)).toEqual({});
    });

    test('One strongly connected component', () => {
        const graph = new Map([
            [1, [2, 3]],
            [2, [1, 3]],
            [3, [1, 2]]
        ]);

        expect(NetworkComparisonAlgorithms.stronglyConnectedComponents(graph)).toEqual({
            "1": {
                "fillStyle": "#1E90FF",
                "size": 8,
                "strokeStyle": "#1E90FF",
                "textStyle": "#FFFFFF",
            },
            "2": {
                "fillStyle": "#1E90FF",
                "size": 8,
                "strokeStyle": "#1E90FF",
                "textStyle": "#FFFFFF",
            },
            "3": {
                "fillStyle": "#1E90FF",
                "size": 8,
                "strokeStyle": "#1E90FF",
                "textStyle": "#FFFFFF",
            }
        });
    });

    test('Two strongly connected components', () => {
        const graph = new Map([
            [1, [2]],
            [2, [1]],
            [3, [4, 5]],
            [4, [3, 5]],
            [5, [4, 3]]
        ]);

        expect(NetworkComparisonAlgorithms.stronglyConnectedComponents(graph)).toEqual({
            "1": {
                "fillStyle": "#1E90FF",
                "size": 8,
                "strokeStyle": "#1E90FF",
                "textStyle": "#FFFFFF",
            },
            "2": {
                "fillStyle": "#1E90FF",
                "size": 8,
                "strokeStyle": "#1E90FF",
                "textStyle": "#FFFFFF",
            },
            "3": {
                "fillStyle": "#8A2BE2",
                "size": 8,
                "strokeStyle": "#8A2BE2",
                "textStyle": "#FFFFFF",
            },
            "4": {
                "fillStyle": "#8A2BE2",
                "size": 8,
                "strokeStyle": "#8A2BE2",
                "textStyle": "#FFFFFF",
            },
            "5": {
                "fillStyle": "#8A2BE2",
                "size": 8,
                "strokeStyle": "#8A2BE2",
                "textStyle": "#FFFFFF",
            }
        });
    });
    
    test('Five strongly connected components (each node is its own SCC)', () => {
        const graph = new Map([
            [1, [2]],
            [2, [3]],
            [3, [4, 5]],
            [4, []],
            [5, []]
        ]);

        expect(NetworkComparisonAlgorithms.stronglyConnectedComponents(graph)).toEqual({
            "1": {
                "fillStyle": "#9932CC",
                "size": 8,
                "strokeStyle": "#9932CC",
                "textStyle": "#FFFFFF",
            },
            "2": {
                "fillStyle": "#2E8B57",
                "size": 8,
                "strokeStyle": "#2E8B57",
                "textStyle": "#FFFFFF",
            },
            "3": {
                "fillStyle": "#DC143C",
                "size": 8,
                "strokeStyle": "#DC143C",
                "textStyle": "#FFFFFF",
            },
            "4": {
                "fillStyle": "#1E90FF",
                "size": 8,
                "strokeStyle": "#1E90FF",
                "textStyle": "#FFFFFF",
            },
            "5": {
                "fillStyle": "#8A2BE2",
                "size": 8,
                "strokeStyle": "#8A2BE2",
                "textStyle": "#FFFFFF",
            }
        });
    })
});