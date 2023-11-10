const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const chalk = require("chalk");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

// internal import
const { handleFileUpload } = require("./src/helpers/fileUploadHandler");
const { processPdfToFlashcards } = require("./src/helpers/flashcards");
const events = require("./src/helpers/events");

dotenv.config();
const app = express();
app.use(cors());
app.use(fileUpload());

// Serve static files
app.use(express.static(path.join(__dirname, "./public")));

function flashcardsToCSV(flashcards) {
  let csvData = "";
  for (let arr of flashcards) {
    for (let card of arr) {
      csvData += `"${card.front}","${card.back}"\n`;
      console.log(chalk.cyan("Front:", card.front));
      console.log(chalk.green("Back:", card.back));
    }
  } // Save the CSV to a temporary file
  const csvPath = path.join(__dirname, "./flashcards", `${uuidv4()}.csv`);
  const flashcardsPath = path.join(__dirname, "./flashcards");
  if (!fs.existsSync(flashcardsPath)) {
    // If not, create the directory
    fs.mkdirSync(flashcardsPath);
  }
  fs.writeFileSync(csvPath, csvData);
  return csvPath;
}

app.post("/flashcards", async (req, res) => {
  let tempFilePath;
  const { startPage, endPage, apiKey } = req.body;
  try {
    tempFilePath = await handleFileUpload(req);
    const flashcards = await processPdfToFlashcards(
      tempFilePath,
      startPage,
      endPage,
      apiKey
    );

    // Convert flashbacks to CSV format
    const csvPath = flashcardsToCSV(flashcards);

    // Delete the temporary File
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    res.download(csvPath);
  } catch (e) {
    console.error("Error is here: ", e);
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    events.emit("error");
    res.status(500).send(e);
  }
});

const port = 5000;
app.listen(port, () => {
  console.log("The server has connected to port 5000..");
});
