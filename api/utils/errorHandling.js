import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

const PORT = process.env.API_PORT;
const URL = process.env.SCRAPING_TEST_URL;

export const unknownEndpoint = (request, response) => {
	response
		.status(404)
		.send({ error: "unknown endpoint", local_usage: `http://localhost:${PORT}/api/${URL}`, frontend_input: URL });
};

export const errorHandler = (err, req, res, next) => {
	if (err.name) return res.status(400).send({ error: err.name });
	next(err);
};
