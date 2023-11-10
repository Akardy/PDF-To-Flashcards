document.getElementById("upload-btn").addEventListener("click", async () => {
  const pdfInput = document.getElementById("pdf-input");
  const startPage = document.getElementById("start-page-input");
  const endPage = document.getElementById("end-page-input");
  const apiKey = document.getElementById("api-key-input");
  if (pdfInput.files.length === 0) {
    alert("Please select a PDF file first.");
    return;
  }

  const formData = new FormData();
  formData.append("pdf", pdfInput.files[0]);
  formData.append("startPage", startPage.value);
  formData.append("endPage", endPage.value);
  formData.append("apiKey", apiKey.value);

  try {
    const response = await fetch("/flashcards", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const downloadLink = document.getElementById("downloadLink");
      downloadLink.href = url;
      downloadLink.download = "flashcards.csv";
      downloadLink.style.display = "block";
    } else {
      alert("Error generating flashcards. Please try again.");
    }
  } catch (error) {
    console.error("Error uploading the file:", error);
  }
});
