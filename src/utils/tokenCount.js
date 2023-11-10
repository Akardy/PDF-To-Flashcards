const { encoding_for_model } = require("@dqbd/tiktoken");

//Returns the number of tokens in a text string
function tokenCounter(text) {
  const encoder = encoding_for_model("gpt-3.5-turbo");
  const tokens = encoder.encode(text);
  encoder.free();
  return tokens.length;
}

module.exports = { tokenCounter };
