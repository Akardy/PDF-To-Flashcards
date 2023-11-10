const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

async function handleFileUpload(req) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const uploadedPdf = req.files.pdf;
  const uploadDir = path.join(__dirname, "../../uploads");

  // Check if the directory exists
  if (!fs.existsSync(uploadDir)) {
    // If not, create the directory
    fs.mkdirSync(uploadDir);
  }
  const tempFilePath = path.join(uploadDir, `${uuidv4()}_${Date.now()}.pdf`);
  await uploadedPdf.mv(tempFilePath);
  return tempFilePath;
}

module.exports = { handleFileUpload };
