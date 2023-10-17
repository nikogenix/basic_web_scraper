import Loading from "./components/Loading";
import FilterDropdown from "./components/FilterDropdown";

const Results = ({ loading, scrapedDataRef, scrapedDataRaw }) => {
	return (
		<div className="grow bg-indigo-900/30 w-11/12 md:w-[700px] p-3 mx-auto mt-10 mb-4 overflow-y-scroll">
			<FilterDropdown scrapedDataRaw={scrapedDataRaw} scrapedDataRef={scrapedDataRef} />
			<div className="mr-4" ref={scrapedDataRef}></div>
			<Loading loading={loading} />
		</div>
	);
};

export default Results;
