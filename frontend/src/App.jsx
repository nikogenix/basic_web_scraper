import { useRef, useState } from "react";
import JSONFormatter from "json-formatter-js";
import ReactLoading from "react-loading";

import scraper from "./services/scraper";

const SITE_URL = import.meta.env.VITE_SCRAPING_TEST_URL;

function App() {
	const scrapedDataRef = useRef();
	const [inputValue, setInputvalue] = useState("");
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e) => {
		setInputvalue(e.target.value);
	};

	const processData = (data) => {
		const formattedData = new JSONFormatter(data, Infinity, { theme: "dark" });
		scrapedDataRef.current.appendChild(formattedData.render());
		setLoading(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		scrapedDataRef.current.innerHTML = "";
		scraper.get(inputValue).then((data) => processData(data));
	};

	const handleAutoSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setInputvalue(SITE_URL);
		scrapedDataRef.current.innerHTML = "";
		scraper.get(SITE_URL).then((data) => processData(data));
	};

	return (
		<div className="font-mono flex flex-col h-screen">
			<h1 className="text-3xl text-center py-10 text-indigo-300">web scraper</h1>
			<div className="flex align-center flex-col w-full px-4 sm:max-w-max m-auto">
				<form>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg
								className="w-4 h-4 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
						</div>

						<input
							value={inputValue}
							onChange={(e) => handleInputChange(e)}
							className="block w-full p-4 pl-10 pr-24 h-14  bg-gradient-to-b from-zinc-800 to-zinc-900 text-indigo-200  focus:border-b-2 focus:outline-none focus:border-indigo-500 border-b-2 border-zinc-900"
							type="search"
							name="url-input"
							id="url-input"
							placeholder="https://www.example.com/"
						/>

						<button
							type="submit"
							className="text-white absolute right-2.5 bottom-2.5 bg-indigo-700 hover:bg-gradient-radial hover:to-indigo-600 hover:from-indigo-800 active:from-indigo-900 active:to-indigo-600 focus:ring-2 focus:outline-none focus:ring-indigo-500 font-medium rounded-lg text-sm px-4 py-2 "
							onClick={(e) => handleSubmit(e)}
						>
							search
						</button>
					</div>
				</form>

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
						<button
							type="submit"
							className="text-white  bg-indigo-50 hover:bg-gradient-radial hover:to-indigo-50 hover:from-indigo-200 active:from-indigo-900 active:to-indigo-600 focus:ring-2 focus:outline-none focus:ring-indigo-500 font-medium rounded-lg text-sm px-2 py-2 group ml-3"
							onClick={(e) => handleAutoSubmit(e)}
						>
							<svg
								className="w-[20px] h-[20px] text-indigo-900 group-active:group-hover:hidden"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="20"
								fill="none"
								viewBox="0 0 16 20"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 1v4a1 1 0 0 1-1 1H1m8.484 7.984 2.152 2.152M15 2v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Zm-4.636 9.864a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
							<svg
								className="w-[20px] h-[20px] text-gray-800 dark:text-white hidden group-active:group-hover:block"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 16 20"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 1v4a1 1 0 0 1-1 1H1m4 6 2 2 4-4m4-8v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z"
								/>
							</svg>
						</button>
					</span>
				</p>
			</div>
			<div className="grow bg-indigo-900/30 w-11/12 md:w-[700px] p-3 mx-auto mt-10 mb-4 overflow-y-scroll">
				<div className="mr-4" ref={scrapedDataRef}></div>

				<div
					className={`text-[0.8125rem] text-center text-indigo-300 ${
						loading ? "block" : "hidden"
					} absolute flex ml-4`}
				>
					<p>loading</p>{" "}
					<ReactLoading className="inline-block relative top-2 ml-1" width={12} color="#A5B4FC" />
					{/* #A5B4FC === indigo-300 */}
				</div>
			</div>
		</div>
	);
}

export default App;
