import express from "express";
import cors from "cors";
import { unknownEndpoint, errorHandler } from "./utils/errorHandling.js";
import dotenv from "dotenv";

const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(cors());

dotenv.config({ path: "../config/.env" });

const PORT = process.env.API_PORT;
const URL = process.env.SCRAPING_TEST_URL;

app.get(`/api/${URL}`, (req, res) => {
	res.json({ requested_url: URL });
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`API available at http://localhost:${PORT}/api/`);
});
