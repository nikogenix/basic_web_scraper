import { useState } from "react";
import JSONFormatter from "json-formatter-js";

import scraper from "../../services/scraper";

import IconButton from "../IconButton";
import Input from "./components/Input";

const SITE_URL = import.meta.env.VITE_SCRAPING_TEST_URL;

const Search = ({ setLoading, scrapedDataRef, setScrapedDataRaw }) => {
	const [inputValue, setInputvalue] = useState("");

	const processData = (data) => {
		setScrapedDataRaw(data);
		const formattedData = new JSONFormatter(data, Infinity, { theme: "dark" });
		scrapedDataRef.current.appendChild(formattedData.render());
		setLoading(false);
	};

	const handleAutoSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setInputvalue(SITE_URL);
		scrapedDataRef.current.innerHTML = "";
		scraper.get(SITE_URL).then((data) => processData(data));
	};

	return (
		<div className="flex align-center flex-col w-full px-4 sm:max-w-max m-auto">
			<Input
				setLoading={setLoading}
				scrapedDataRef={scrapedDataRef}
				inputValue={inputValue}
				setInputvalue={setInputvalue}
				processData={processData}
			/>{" "}
			<p className="mt-2 text-sm text-gray-300 text-center mx-3">
				currently only supports{" "}
				<span className="block sm:inline">
					<a
						className="text-indigo-200 hover:text-indigo-100 active:text-indigo-300 visited:text-gray-300 underline underline-offset-4"
						target="_blank"
						href="https://wsa-test.vercel.app/"
						rel="noreferrer"
					>
						https://wsa-test.vercel.app/
					</a>
					<IconButton handleClick={handleAutoSubmit} icon="fileSearch" />
				</span>
			</p>
		</div>
	);
};

export default Search;
