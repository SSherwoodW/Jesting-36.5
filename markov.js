/** Textual markov chain generator */

class MarkovMachine {
    /** build markov machine; read in text.*/

    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter((c) => c !== "");
        this.chain = this.makeChains();
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains(text) {
        let textDict = {};
        for (let i = 0; i < this.words.length - 1; i++) {
            let word = this.words[i];
            let nextWord = this.words[i + 1];
            if (!textDict[word]) {
                textDict[word] = [];
            }
            textDict[word].push(nextWord);
        }
        let lastWord = this.words[this.words.length - 1];
        if (!textDict[lastWord]) {
            textDict[lastWord] = [null];
        } else {
            textDict[lastWord].push(null);
        }
        return textDict;
    }

    /** return random text from chains */

    makeText(numWords = this.words.length) {
        if (this.words.length === 0) {
            return "";
        }

        let currentWord =
            this.words[Math.floor(Math.random() * this.words.length)];
        let generatedText = [currentWord];

        while (generatedText.length < numWords) {
            const possibleNextWords = this.chain[currentWord];

            if (!possibleNextWords || possibleNextWords.length === 0) {
                break;
            }

            const nextWord =
                possibleNextWords[
                    Math.floor(Math.random() * possibleNextWords.length)
                ];
            if (nextWord === null) {
                break;
            }
            generatedText.push(nextWord);
            currentWord = nextWord;
        }
        return generatedText.join(" ");
    }
}

module.exports = MarkovMachine;
