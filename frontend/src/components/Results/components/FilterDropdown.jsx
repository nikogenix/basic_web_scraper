import { useEffect, useState } from "react";
import JSONFormatter from "json-formatter-js";

import IconButton from "../../IconButton";
import FilterInput from "./FilterInput";

const FilterDropdown = ({ scrapedDataRaw, scrapedDataRef }) => {
	const [category, setCategory] = useState("");
	const [author, setAuthor] = useState("");
	const [sentiment, setSentiment] = useState("");
	const [filterDisabled, setFilterDisabled] = useState(true);

	useEffect(() => {
		if (scrapedDataRaw?.data) setFilterDisabled(false);
		else setFilterDisabled(true);
	}, [scrapedDataRaw]);

	const processFilter = () => {
		const filteredData = scrapedDataRaw.data.filter((c) => {
			const categoryCheck = c.category.toLowerCase().includes(category.toLowerCase());
			const sentimentCheck = c.sentiment.toLowerCase().includes(sentiment.toLowerCase());
			const authorCheck =
				c.author.name.toLowerCase().includes(author.toLowerCase()) ||
				c.author.title.toLowerCase().includes(author.toLowerCase());
			return categoryCheck && sentimentCheck && authorCheck;
		});
		const filteredResponse = {
			requested_url: scrapedDataRaw.requested_url,
			data: filteredData.length === 0 ? { error: "no data matches the filters" } : filteredData,
		};
		const formattedData = new JSONFormatter(filteredResponse, Infinity, { theme: "dark" });
		scrapedDataRef.current.innerHTML = "";
		scrapedDataRef.current.appendChild(formattedData.render());
	};

	const handleFilterDropdown = () => {
		const dropdown = document.getElementById("dropdown");
		if (dropdown.classList.contains("hidden")) {
			dropdown.classList.add("block");
			dropdown.classList.remove("hidden");
		} else {
			dropdown.classList.add("hidden");
			dropdown.classList.remove("block");
		}
	};

	const handleFiltering = () => {
		processFilter();
		handleFilterDropdown();
	};

	return (
		<div className="relative flex flex-row-reverse">
			<IconButton handleClick={handleFilterDropdown} icon={"filterV2"} disabled={filterDisabled} />

			<div
				id="dropdown"
				className="absolute z-10 hidden w-auto text-sm rounded-lg shadow-md border-indigo-50 border bg-zinc-800 mt-9 px-3 py-5"
			>
				<FilterInput label={"category"} value={category} handleChange={(e) => setCategory(e.target.value)} />
				<FilterInput label={"author"} value={author} handleChange={(e) => setAuthor(e.target.value)} />
				<FilterInput label={"sentiment"} value={sentiment} handleChange={(e) => setSentiment(e.target.value)} />
				<div className="flex justify-end">
					<IconButton icon={"apply"} handleClick={handleFiltering} />
				</div>
			</div>
		</div>
	);
};

export default FilterDropdown;
