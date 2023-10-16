import axios from "axios";

const WEBSCRAPER_API = import.meta.env.VITE_API;

/**
 * Scrapes a site and some of its pages, and returns relevant data as an object
 * @param {string} urlToScrape - currently only supports https://wsa-test.vercel.app/
 * @returns {{
 *   title: string,
 *   short_description: string,
 *   category: string,
 *   author: {
 *     name: string,
 *     title: string
 *   },
 *   image: string,
 *   url: string,
 *   submissionDate: string,
 *   intro: string,
 *   word_count: number,
 *   highlights: string[],
 *   sentiment: string
 * }}
 */
const get = (urlToScrape = "www.example.com") => {
	// urlToScrape = "www.example.com"; // forcing default value to avoid unnecessary requests during development
	const request = axios.get(`${WEBSCRAPER_API}${urlToScrape}`);
	return request.then((response) => response.data).catch((err) => err.response.data);
};

export default { get };
