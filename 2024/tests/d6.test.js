import { createGrid, move, readData, getStartingPosition} from "../d6";

describe("Day 6", () => {
    const data = `abc\nabc\nabc`;
    const grid = createGrid(data);
    it("should create a grid", () => {
        expect(grid).toEqual([['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c']]);
    });
});

describe("getStarting Position", () => {
    const data = `....\n..^.\n....`;
    const grid = createGrid(data);
    it("should get the starting position", () => {
        expect(getStartingPosition(grid)).toEqual([1, 2]);
    });
});

describe("move", () => {
    const data = `....\n..^.\n....`;
    const grid = createGrid(data);
    const position = getStartingPosition(grid);
    console.log("position", position);
    it("should move up", () => {
        expect(move(grid, position, '^')).toEqual([0, 2]);
    });
    it("should move down", () => {
        expect(move(grid, position, 'v')).toEqual([2, 2]);
    });
    it("should move left", () => {
        expect(move(grid, position, '<')).toEqual([1, 1]);
    });
    it("should move right", () => {
        expect(move(grid, position, '>')).toEqual([1, 3]);
    });
});