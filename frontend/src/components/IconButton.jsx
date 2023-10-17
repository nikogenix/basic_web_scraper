const iconDefaultStyle = "w-[20px] h-[20px] text-indigo-900 group-active:group-hover:hidden";
const iconClickStyle = "w-[20px] h-[20px] text-gray-800 dark:text-white hidden group-active:group-hover:block";

const iconPairs = {
	fileSearch: [
		<svg
			className={iconDefaultStyle}
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
		</svg>,
		<svg
			className={iconClickStyle}
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
		</svg>,
	],
	filterV1: [
		<svg
			className={iconDefaultStyle}
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 20 18"
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="m2.133 2.6 5.856 6.9L8 14l4 3 .011-7.5 5.856-6.9a1 1 0 0 0-.804-1.6H2.937a1 1 0 0 0-.804 1.6Z"
			/>
		</svg>,
		<svg
			className={iconClickStyle}
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 20 18"
		>
			<path d="M18.85 1.1A1.99 1.99 0 0 0 17.063 0H2.937a2 2 0 0 0-1.566 3.242L6.99 9.868 7 14a1 1 0 0 0 .4.8l4 3A1 1 0 0 0 13 17l.01-7.134 5.66-6.676a1.99 1.99 0 0 0 .18-2.09Z" />
		</svg>,
	],
	filterV2: [
		<svg
			className={iconDefaultStyle}
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
				d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"
			/>
		</svg>,
		<svg
			className={iconClickStyle}
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 20 20"
		>
			<path d="M1 5h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 1 0 0-2H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2Zm18 4h-1.424a3.228 3.228 0 0 0-6.152 0H1a1 1 0 1 0 0 2h10.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Zm0 6H8.576a3.228 3.228 0 0 0-6.152 0H1a1 1 0 0 0 0 2h1.424a3.228 3.228 0 0 0 6.152 0H19a1 1 0 0 0 0-2Z" />
		</svg>,
	],
	apply: [
		<svg
			className={iconDefaultStyle}
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
				d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
		</svg>,
		<svg
			className={iconClickStyle}
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 20 20"
		>
			<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
		</svg>,
	],
};

const IconButton = ({ handleClick, icon, extraStyling, disabled }) => {
	return (
		<button
			type="submit"
			className={` bg-indigo-50   focus:ring-2 focus:outline-none focus:ring-indigo-500 font-medium rounded-lg text-sm px-2 py-2 ml-3 w-min ${
				!disabled &&
				"hover:from-indigo-200 hover:to-indigo-50  active:from-indigo-900 active:to-indigo-600 hover:bg-gradient-radial group"
			} ${disabled && "cursor-not-allowed"} ${extraStyling}`}
			onClick={(e) => handleClick(e)}
			disabled={disabled}
		>
			{iconPairs[icon][0]}
			{iconPairs[icon][1]}
		</button>
	);
};

export default IconButton;
