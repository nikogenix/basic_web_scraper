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
	return axios
		.get(`${WEBSCRAPER_API}${urlToScrape}`)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			if (err.code === "ERR_BAD_REQUEST") return err.response.data;
			else return { error: "unable to reach server" };
		});
};

export default { get };
