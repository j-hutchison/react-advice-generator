import { useState, useEffect, useCallback } from "react";
import classes from "./Modal.module.css";

const Modal = () => {
	const [adviceMessage, setAdviceMessage] = useState("");
	const [adviceId, setAdviceId] = useState(0);
	const REQUEST_URL = "https://api.adviceslip.com/advice";

	useEffect(() => {
		getAdvice();
	}, []);

	const getAdvice = useCallback(async () => {
		console.log(`Use Effect on init`);
		const response = await fetch(REQUEST_URL);

		if (!response.ok) {
			throw new Error(
				"An error occurred when getting data from the advice api"
			);
		}

		const data = await response.json();
		console.log(data);

		const { advice } = data.slip;
		console.log(advice);

		setAdviceMessage(() => {
			return advice;
		});
	}, []);

	return (
		<div className={classes.modal}>
			<h1 className={classes.message}>{adviceMessage}</h1>
			<button
				className={`${classes["btn"]} ${classes["btn-advice"]}`}
				onClick={getAdvice}
			>
				Give me advice!
			</button>
		</div>
	);
};

export default Modal;
