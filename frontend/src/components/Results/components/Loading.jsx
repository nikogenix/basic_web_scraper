import ReactLoading from "react-loading";

const Loading = ({ loading }) => {
	return (
		<div
			className={`text-[0.8125rem] text-center text-indigo-300 ${
				loading ? "block" : "hidden"
			} absolute flex ml-4`}
		>
			<p>loading</p> <ReactLoading className="inline-block relative top-2 ml-1" width={12} color="#A5B4FC" />
			{/* #A5B4FC === indigo-300 */}
		</div>
	);
};

export default Loading;
