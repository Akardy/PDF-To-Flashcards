const { OpenAI } = require("openai");
const dotenv = require("dotenv");
dotenv.config();

async function sendToGPT(prompt, apiKey) {
  const openai = new OpenAI({
    apiKey,
  });

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      //model: "gpt-4-0613",
      messages: [
        {
          role: "system",
          content: behaviour,
        },
        {
          role: "user",
          content: systemPrompt + 'Text """\n' + prompt + '"""\n',
        },
      ],
      temperature: 0.9,
    });
    const complete = res.choices[0].message.content.trim();

    if (complete.startsWith("[") && complete.endsWith("]")) {
      return JSON.parse(complete);
    } else {
      return complete;
    }
  } catch (e) {
    console.error("Error: ", e);
  }
}

const systemPrompt = `
You are receiving the text from one slide of a lecture. Use the following principles when making the flashcards:

- Before doing anything, summarise the text and ask yourself the question "What would I have to know from this slide to pass an exam on the topic".
- Create Anki flashcards for an exam at university level.
- Each card is standalone.
- Short answers.
- All information on slide needs to be used and only use the information that is on the slide.
- Answers should be on the back and not included in the question.
- Only add each piece of information once.
- Questions and answers must be in English.
- No questions about the uni, course, professor, book author or auxiliary slide information.
- Questions should always be clear and not vague.
- Questions should always be specific 

Desired output:
[
{
"front": "<content1>",
"back": "<content1>"
},
{
"front": "<content2>",
"back": "<content2>"
}
]`;

const behaviour =
  "You are a flashcard making assistant. Follow the user's requirements carefully and to the letter.";

module.exports = { sendToGPT };
