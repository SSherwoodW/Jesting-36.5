/** Command-line tool to generate Markov text. */
const fs = require("fs");
const axios = require("axios");
let MarkovMachine = require("./markov");

function generateText(input) {
    const markov = new MarkovMachine(input);
    const generatedText = markov.makeText();
    console.log(generatedText);
}

function printErrorMessage(message) {
    console.error("Error:", message);
}

const args = process.argv.slice(2);

if (args.length !== 2) {
    printErrorMessage("Usage: node makeText.js <source> <input>");
    process.exit(1);
}

const source = args[0];
const input = args[1];

if (source === "file") {
    fs.readFile(input, "utf8", (error, data) => {
        if (error) {
            printErrorMessage(
                `Error reading file '${input}': ${error.message}`
            );
        } else {
            generateText(data);
        }
    });
} else if (source === "url") {
    axios
        .get(input)
        .then((response) => {
            const text = response.data;
            generateText(text);
        })
        .catch((error) => {
            printErrorMessage(
                `Error fetching URL '${input}': ${error.message}`
            );
        });
} else {
    printErrorMessage('Invalid source--use "file" or "url".');
    process.exit(1);
}
