const { text } = require("stream/consumers");
const MarkovMachine = require("../markov");

describe("MarkovMachine", () => {
    let markov;

    beforeEach(function () {
        const text = "the cat in the hat";
        markov = new MarkovMachine(text);
    });

    test("constructor should initialize words correctly", () => {
        expect(markov.words).toEqual(["the", "cat", "in", "the", "hat"]);
    });
    test("constructor should return correct markov chains", () => {
        expect(markov.makeChains()).toEqual({
            the: ["cat", "hat"],
            cat: ["in"],
            in: ["the"],
            hat: [null],
        });
    });
    test("class method makeText returns text with expected length", () => {
        const generatedText = markov.makeText(text);
        const generatedWords = generatedText.split(" ");
        expect(generatedWords.length).toEqual(text.length);
    });
    test("class method makeText should return a string", () => {
        const generatedText = markov.makeText();
        expect(typeof generatedText).toBe("string");
    });
});
