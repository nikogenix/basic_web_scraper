import express from "express";
import cors from "cors";
import { unknownEndpoint, errorHandler, unsupportedUrl } from "./utils/errorHandling.js";
import dotenv from "dotenv";
import { scrapeTestSite } from "./utils/testSiteScraping.js";

const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(cors());

dotenv.config({ path: "../config/.env" });

const PORT = process.env.API_PORT;
const SITE_URL = process.env.SCRAPING_TEST_URL;
const local_usage = [`http://localhost:${PORT}/api/url/${SITE_URL}`];

const apiUrlPattern =
	/^(\/api\/url\/)((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9-_.]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9-_.]{2,}\.[a-zA-Z0-9-_.]{2,}\.[a-zA-Z0-9-_.]{2,}(\.[a-zA-Z0-9-_.]{2,})?)/;

const routes = [
	{
		path: `/api`,
		handler: (req, res) => {
			res.json({ supported: { local_usage, frontend_input: [SITE_URL] } });
		},
	},
	{
		path: `/api/url/${SITE_URL}`,
		handler: async (req, res) => {
			const data = await scrapeTestSite(SITE_URL);
			res.json({ requested_url: SITE_URL, data });
		},
	},
	{
		path: apiUrlPattern,
		handler: (req, res) => {
			const url = req.params[1];
			unsupportedUrl(url, req, res);
		},
	},
];

routes.forEach((route) => {
	app.get(route.path, route.handler);
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`API available at http://localhost:${PORT}/api/`);
});
