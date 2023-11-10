const EventEmitters = require("events");
const chalk = require("chalk");

const events = new EventEmitters();

events.on("extraction", () => {
  console.time("Execution time");
  console.log("Extracting the data..");
});

events.on("info", (totalTokenNum, chunksLength) => {
  console.timeEnd("Execution time");
  console.log(chalk.green("The program has executed successfully."));
  console.log("The total token number is:", totalTokenNum);
  console.log("The number of chunks are:", chunksLength);
});

events.on("error", () => {
  console.log(chalk.red("Error with receiving a response."));
});

module.exports = events;
