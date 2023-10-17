import puppeteer from "puppeteer";
import { sentimentAnalysis } from "./sentimentAnalysis.js";

/**
 * Scrapes a site and some of its pages, and returns relevant data as an object
 * @param {string} siteUrl - currently only supports https://wsa-test.vercel.app/
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
export const scrapeTestSite = async (siteUrl) => {
	const browser = await puppeteer.launch({ headless: "new" });
	const page = await browser.newPage();
	try {
		await page.goto(siteUrl);

		const articles = await page.$$eval(
			"main > div > div > div:nth-of-type(2) > div",
			(elements, siteUrl) =>
				elements.map((e) => {
					const title = e.querySelector("a:has(> span)").innerText;
					const category = e.querySelector("time ~ div").innerText;
					const short_description = e.querySelector(
						"div > div:nth-of-type(2) > div:nth-of-type(2)"
					).innerText;
					const authorName = e.querySelector(
						"div > div:nth-of-type(3) > img ~ div > div:nth-of-type(1)"
					).innerText;
					const authorTitle = e.querySelector(
						"div > div:nth-of-type(3) > img ~ div > div:nth-of-type(2)"
					).innerText;
					const image = e.querySelector("a > img").getAttribute("src");
					const url = e.querySelector("a").getAttribute("href");
					const submission_date = e.querySelector("time").getAttribute("datetime");

					return {
						title,
						short_description,
						category,
						author: {
							name: authorName,
							title: authorTitle,
						},
						image: siteUrl + image,
						url: siteUrl + url,
						submission_date,
					};
				}),
			siteUrl.slice(0, -1)
		);

		const data = await Promise.all(
			articles.map(async (article) => {
				try {
					const pageSecondary = await browser.newPage();
					await pageSecondary.goto(article.url);

					const blog_text = await pageSecondary.$$eval(
						"div > div > div > div > div:nth-child(2) > div > div > *",
						(elements) => elements.map((e) => e.textContent)
					);

					const words = blog_text.join(" ").split(/\s+|[,.;?!]+/);

					const sentiment = sentimentAnalysis(words);

					const highlights = await pageSecondary.$$eval(
						"div > div > div > div > div:nth-child(2) > div > div strong",
						(elements) => elements.map((e) => e.textContent)
					);

					article.intro = blog_text[1];
					article.word_count = words.length;
					article.highlights = highlights;
					article.sentiment = sentiment;
				} catch (error) {
					await browser.close();
					throw new Error("unable to fulfill request, please try again later");
				}
				return article;
			})
		);

		await browser.close();
		return data;
	} catch (error) {
		await browser.close();
		throw new Error("unable to fulfill request, please try again later");
	}
};
