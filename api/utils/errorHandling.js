import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

const PORT = process.env.API_PORT;
const SITE_URL = process.env.SCRAPING_TEST_URL;
const local_usage = [`http://localhost:${PORT}/api/url/${SITE_URL}`];

export const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: "unknown endpoint", supported: { local_usage, frontend_input: [SITE_URL] } });
};

export const unsupportedUrl = (url, request, response) => {
	response.status(404).send({
		requested_url: url,
		error: "unsupported URL",
		supported: { local_usage, frontend_input: [SITE_URL] },
	});
};

export const errorHandler = (err, req, res, next) => {
	console.log(err);
	if (err.name) return res.status(400).send({ error: err.name });
	next(err);
};
