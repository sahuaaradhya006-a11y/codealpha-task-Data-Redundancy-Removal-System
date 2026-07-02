const stringSimilarity = require("string-similarity");

const findDuplicate = (newContent, records) => {
  let bestMatch = null;
  let highestScore = 0;

  records.forEach((record) => {
    const score = stringSimilarity.compareTwoStrings(
      newContent.toLowerCase().trim(),
      record.content.toLowerCase().trim()
    );

    if (score > highestScore) {
      highestScore = score;
      bestMatch = record;
    }
  });

  return {
    duplicate: highestScore >= 0.8, // 80% similarity
    score: Math.round(highestScore * 100),
    matchedRecord: bestMatch,
  };
};

module.exports = { findDuplicate };