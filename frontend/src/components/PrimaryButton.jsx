const PrimaryButton = ({ text, handleClick, extraStyle }) => {
	return (
		<button
			className={`text-white bg-indigo-700 hover:bg-gradient-radial hover:to-indigo-600 hover:from-indigo-800 active:from-indigo-900 active:to-indigo-600 focus:ring-2 focus:outline-none focus:ring-indigo-500 font-medium rounded-lg text-sm px-4 py-2 ${extraStyle}`}
			onClick={(e) => handleClick(e)}
		>
			{text}
		</button>
	);
};

export default PrimaryButton;
