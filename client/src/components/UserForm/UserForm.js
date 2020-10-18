import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { USERFORM_NAME_TEXT, USERFORM_NUMBER_TEXT, USERFORM_SUBMIT } from "../../helpers/constants";
import "./UserForm.css";

const UserForm = ({ handleFormSubmition }) => {
	const [userInfo, setUserInfo] = useState({ name: "", number: "" });
	const [error, setError] = useState(false);

	const handleChange = e => {
		if (error) setError(false);
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = () => {
		if (userInfo.name && userInfo.number) {
			handleFormSubmition(userInfo);
		} else {
			setError(true);
		}
	};

	return (
		<div className="user-form">
			<TextField
				error={error && !userInfo.name}
				required
				label={USERFORM_NAME_TEXT}
				name="name"
				value={userInfo.name}
				variant="standard"
				onChange={handleChange}
				style={{ margin: "1rem" }}
			></TextField>
			<TextField
				error={error && !userInfo.number}
				required
				label={USERFORM_NUMBER_TEXT}
				name="number"
				value={userInfo.number}
				variant="standard"
				onChange={handleChange}
				style={{ margin: "1rem" }}
			></TextField>
			<Button
				className="submit-button"
				variant="outlined"
				color="secondary"
				onClick={handleFormSubmit}
			>
				{USERFORM_SUBMIT}
			</Button>
		</div>
	);
};

export default UserForm;
