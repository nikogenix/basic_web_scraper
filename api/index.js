import express from "express";
import cors from "cors";
import { unknownEndpoint, errorHandler, unsupportedUrl } from "./utils/errorHandling.js";
import dotenv from "dotenv";

const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(cors());

dotenv.config({ path: "../config/.env" });

const PORT = process.env.API_PORT;
const URL = process.env.SCRAPING_TEST_URL;
const local_usage = [`http://localhost:${PORT}/api/url/${URL}`];

const apiUrlPattern =
	/^(\/api\/url\/)((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9-_.]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9-_.]{2,}\.[a-zA-Z0-9-_.]{2,}\.[a-zA-Z0-9-_.]{2,}(\.[a-zA-Z0-9-_.]{2,})?)/;

const routes = [
	{
		path: `/api`,
		handler: (req, res) => {
			res.json({ supported: { local_usage, frontend_input: [URL] } });
		},
	},
	{
		path: `/api/url/${URL}`,
		handler: (req, res) => {
			res.json({ requested_url: URL });
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
