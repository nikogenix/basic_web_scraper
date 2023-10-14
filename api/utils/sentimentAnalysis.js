import { negativeWords, positiveWords } from "../data/sentimentAnalysisData.js";

/**
 *	Calculates the percentage of positive and negative words, and returns the overall sentiment
 * @param {string[]} data - array of words to analyse
 * @returns {("positive"|"neutral"|"negative")}
 */
export const sentimentAnalysis = (data) => {
	const wordCount = data.length;
	let positiveCount = 0;
	let negativeCount = 0;

	data.forEach((elem) => {
		const word = elem.toLowerCase();
		if (positiveWords.includes(word)) {
			positiveCount++;
		} else if (negativeWords.includes(word)) {
			negativeCount++;
		}
	});

	const positivePercentage = (positiveCount / wordCount) * 100;
	const negativePercentage = (negativeCount / wordCount) * 100;

	const percentageDifference = Math.abs(positivePercentage - negativePercentage);

	return percentageDifference < 3 ? "neutral" : positivePercentage > negativePercentage ? "positive" : "negative";
};
