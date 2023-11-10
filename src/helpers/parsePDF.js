const { PDFDocument } = require("pdf-lib");
const pdf = require("pdf-parse");
const { tokenCounter } = require("../utils/tokenCount");
const fs = require("fs");

async function extractPages(dataBuffer, startPage, endPage) {
  try {
    const pdfDoc = await PDFDocument.load(dataBuffer);
    const extractedPdf = await PDFDocument.create();

    for (let i = startPage - 1; i < endPage; i++) {
      const [copiedPage] = await extractedPdf.copyPages(pdfDoc, [i]);
      extractedPdf.addPage(copiedPage);
    }

    return await extractedPdf.save();
  } catch (e) {
    console.error("Error extracting the pages:", e);
    throw e;
  }
}

async function parsePdf(dataBuffer) {
  try {
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing the PDF:", error);
  }
}

async function extractAndParse(dataBuffer, startPage, endPage) {
  try {
    const extractedBuffer = await extractPages(dataBuffer, startPage, endPage);
    const text = await parsePdf(extractedBuffer);
    return text;
  } catch (e) {
    console.error("Error in extractAndParse: ", e);
  }
}

async function pdfTextAndTokenNum(path, start, end) {
  const readFile = fs.readFileSync(path);
  const pdfText = await extractAndParse(readFile, start, end);
  const totalTokenNum = tokenCounter(pdfText);
  return { pdfText, totalTokenNum };
}

module.exports = { extractAndParse, pdfTextAndTokenNum };
