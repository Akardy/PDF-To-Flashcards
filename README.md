# PDF-To-Flashcards
 
## Introduction 
A web app to assist students in converting large PDF files into flashcards with AI

## Features
- **PDF Upload**: Users can upload large PDF documents to create flashcards.
- **Page Selection**: Users can select specific starting and ending pages for flashcard generation, providing flexibility and focus on the required content.
- **AI Integration**: The application leverages GPT API to generate flashcards.
- **Downloadable Flashcards**: After processing, users can download the generated flashcards in CSV format to import on Anki or other third-party apps.

## Setup and Installation

To get the PDF to Flashcards application running locally on your machine, follow these steps:

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) installed on your system. This will also install npm (Node Package Manager), which is required to manage the project's dependencies.
- You need a GPT API Key from OpenAI to generate the flashcards.

### Installation Steps
1. **Clone the Repository**
   - First, clone the repository to your local machine using Git:
     ```bash
     git clone https://github.com/Akardy/PDF-To-Flashcards.git
     cd PDF-To-Flashcards
     ```

2. **Install Dependencies**
   - Inside the project directory, run the following command to install the necessary packages:
     ```bash
     npm install
     ```

3. **Starting the Application**
   - You can start the application using the following commands:
     - Using Node directly:
       ```bash
       node index.js
       ```
       
4. **Accessing the Application**
   - Once the application runs, you can access it through your browser. The URL will be: https://localhost:5000


Following these steps, you should have the PDF to Flashcards application running on your local environment, ready for use.


## Acknowledgements
The prompt I'm using is from: [https://github.com/benno094/pdf-anki](https://github.com/benno094/pdf-anki)
