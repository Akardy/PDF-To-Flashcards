const { divideText } = require("./divideText");
const { sendToGPT } = require("./gpt");
const { pdfTextAndTokenNum } = require("./parsePDF");
const events = require("./events");

async function textToFlashcards(text, apiKey) {
  const textAsArray = divideText(text);
  const chunksLength = textAsArray.length;
  const flashcardsPromises = textAsArray.map((text) => sendToGPT(text, apiKey));
  const flashcards = await Promise.all(flashcardsPromises);
  return { flashcards, chunksLength };
}

async function processPdfToFlashcards(filePath, start, end, apiKey) {
  events.emit("extraction");
  const { pdfText, totalTokenNum } = await pdfTextAndTokenNum(
    filePath,
    start,
    end
  );
  const { flashcards, chunksLength } = await textToFlashcards(pdfText, apiKey);
  events.emit("info", totalTokenNum, chunksLength);

  return flashcards;
}

module.exports = { processPdfToFlashcards };
