import puppeteer from "puppeteer";

export const scrapeTestSite = async (siteUrl) => {
	const browser = await puppeteer.launch({ headless: "new" });
	const page = await browser.newPage();
	await page.goto(siteUrl);

	const articles = await page.$$eval(
		"main > div > div > div:nth-of-type(2) > div",
		(elements, siteUrl) =>
			elements.map((e) => {
				const title = e.querySelector("a:has(> span)").innerText;
				const category = e.querySelector("time ~ div").innerText;
				const summary = e.querySelector("div > div:nth-of-type(2) > div:nth-of-type(2)").innerText;
				const authorName = e.querySelector(
					"div > div:nth-of-type(3) > img ~ div > div:nth-of-type(1)"
				).innerText;
				const authorTitle = e.querySelector(
					"div > div:nth-of-type(3) > img ~ div > div:nth-of-type(2)"
				).innerText;
				const image = e.querySelector("a > img").getAttribute("src");
				const url = e.querySelector("a").getAttribute("href");
				const submissionDate = e.querySelector("time").getAttribute("datetime");
				const wordCount = summary.split(" ").length;

				return {
					title,
					summary,
					category,
					author: {
						name: authorName,
						title: authorTitle,
					},
					wordCount,
					image: siteUrl + image,
					url: siteUrl + url,
					// sentiment,
					submissionDate,
				};
			}),
		siteUrl.slice(0, -1)
	);

	await browser.close();

	return articles;
};
