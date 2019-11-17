import { X } from "../src/X";

describe("X", () => {

    let x: X;

    beforeEach(() => {
        x = new X();
    })

    it("Some test returns 1", () => {
        expect(x.someCall(1)).toBe(1);
    });
    
    it("Some test returns 2", () => {
        expect(x.someCall(2)).toBe(2);
    });
    
});
