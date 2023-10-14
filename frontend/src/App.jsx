function App() {
	return (
		<div className="font-mono">
			<h1 className="text-3xl text-center py-10 text-indigo-300">web scraper</h1>
			<div className="flex justify-center">
				<input
					className="border-amber-500/80 hover:border-amber-500 focus:border-amber-500 border-b-4 bg-gradient-to-b from-zinc-800 to-zinc-900 text-indigo-50 h-10 p-3 w-96"
					type="search"
					name=""
					id=""
					placeholder="search for a site..."
				/>
				<button className="bg-amber-500 w-11 rounded-md" type="submit">
					🔍
				</button>
			</div>
		</div>
	);
}

export default App;
