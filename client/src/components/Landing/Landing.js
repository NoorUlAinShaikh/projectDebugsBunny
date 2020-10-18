import React from "react";
import history from "../../history";
import { ADMIN_ENTRY_TEXT, USER_ENTRY_TEXT } from "../../helpers/constants";
import "./Landing.css";

const Landing = () => {
	return (
		<div className="landing">
			<div className="admin-side" onClick={() => history.push("/admin")}>
				<h2>{ADMIN_ENTRY_TEXT}</h2>
			</div>
			<div className="user-side" onClick={() => history.push("/user")}>
				<h2>{USER_ENTRY_TEXT}</h2>
			</div>
		</div>
	);
};

export default Landing;
