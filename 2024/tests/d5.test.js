import { getMiddleElement, pageViolation, readData, main } from "../d5";

describe("Checking data integrity", () => {
    test("Read test data", () => {
        const [rules, pages] = readData(true);
        expect(rules.length).toBe(21);
        expect(pages.length).toBe(6);
    });

    test("Read real data", () => {
        const [rules, pages] = readData();
        expect(rules.length).toBe(1176);
        expect(pages.length).toBe(197);
    });
});

describe("Part 1, applyRuleToPage", () => {
    test("Test 1: Rule exist", () => {
        expect(pageViolation("1|2", ["1","2","3"])).toBe(undefined)
        expect(pageViolation("3|2", ["1","2","3"])).toBe(true)
    });
    test("Test 2: Rule does not exist", () => {
        expect(pageViolation("7|5", ["1","3","2"])).toBe(undefined)
        expect(pageViolation("7|2", ["1","3","2"])).toBe(undefined)
    });
});

describe("Part 1, getMiddleElement", () => {
    test("Test 1", () => {
        expect(getMiddleElement(["1","2","3"])).toBe("2");
    });
    test("Test 2", () => {
        expect(getMiddleElement(["1","2","3","4"])).toBe(0);
    });
});

describe("Part 1, Final output", () => {
    test("Test data", () => {expect(main(...readData(true))).toBe(143)});
    test("Real data", () => {expect(main(...readData())).toBe(6260)});
});