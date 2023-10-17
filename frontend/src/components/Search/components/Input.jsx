import scraper from "../../../services/scraper";

import PrimaryButton from "../../PrimaryButton";

const Input = ({ inputValue, setInputvalue, processData, setLoading, scrapedDataRef }) => {
	const handleInputChange = (e) => {
		setInputvalue(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		scrapedDataRef.current.innerHTML = "";
		scraper.get(inputValue).then((data) => processData(data));
	};

	return (
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

				<PrimaryButton handleClick={handleSubmit} text="search" extraStyle={" absolute right-2.5 bottom-2.5"} />
			</div>
		</form>
	);
};

export default Input;
