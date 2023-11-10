const { tokenCounter } = require("../utils/tokenCount");

const TOKEN_LIMIT = 15000;

// This method use Binary Search Approach for more efficiency
function divideText(text) {
  try {
    const sentences = text.split(".").map((s) => s.trim() + ".");

    function divideSegment(segment) {
      if (tokenCounter(segment.join(" ")) <= TOKEN_LIMIT) {
        return [segment.join(" ")];
      }

      const mid = Math.floor(segment.length / 2);
      const firstHalf = segment.slice(0, mid);
      const secondHalf = segment.slice(mid);

      return [...divideSegment(firstHalf), ...divideSegment(secondHalf)];
    }
    return divideSegment(sentences);
  } catch (e) {
    console.error("Error in dividing the text.", e);
    throw e;
  }
}

module.exports = { divideText };
