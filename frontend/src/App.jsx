import { useRef, useState } from "react";

import Results from "./components/Results";
import Search from "./components/Search/";

function App() {
	const [scrapedDataRaw, setScrapedDataRaw] = useState(null);
	const scrapedDataRef = useRef();
	const [loading, setLoading] = useState(false);

	return (
		<div className="font-mono flex flex-col h-screen">
			<h1 className="text-3xl text-center py-10 text-indigo-300">web scraper</h1>

			<Search setLoading={setLoading} scrapedDataRef={scrapedDataRef} setScrapedDataRaw={setScrapedDataRaw} />

			<Results loading={loading} scrapedDataRef={scrapedDataRef} scrapedDataRaw={scrapedDataRaw} />
		</div>
	);
}

export default App;
