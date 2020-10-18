import React, { useState, useEffect } from "react";
import history from "../../history";
import { PROJECT_LOGO, CREATE_QUIZ_BUTTON } from "../../helpers/constants";
import "./Header.css";

const Header = () => {
	const [showCreateQuiz, setShowCreateQuiz] = useState(false);

	useEffect(() => {
		history.listen(handleUrlUpdates);
		enableCreateQuizButton();
	}, []);

	const handleUrlUpdates = () => {
		enableCreateQuizButton();
	};

	const enableCreateQuizButton = () =>
		setShowCreateQuiz(history.location.pathname === "/admin/quizes" ? true : false);

	return (
		<div className="header">
			<h2 className="logo" onClick={() => history.push(`/`)}>
				{PROJECT_LOGO}
			</h2>
			{showCreateQuiz && (
				<div className="create-quiz-container">
					<button
						className="create-quiz-button"
						onClick={() => history.push(`/admin/create_quiz`)}
					>
						{CREATE_QUIZ_BUTTON}
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
