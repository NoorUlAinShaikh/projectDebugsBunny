import React from "react";
import "./Hamburger.css";

const Hamburger = ({ toggle }) => {
	return (
		<div className="hamburger" onClick={toggle}>
			<div className="line"></div>
			<div className="line"></div>
			<div className="line"></div>
		</div>
	);
};
export default Hamburger;
