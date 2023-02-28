import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Form from "./components/Form";

const App = () => {

	return (
		<div style={{
			padding: 24,
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			background: "#f5f5f5"
		}}>
			<div style={{
				height: '100%'
			}}>
				<h1>Hey Cortana</h1>
			</div>
			<Form onSubmit={e => {
				e.preventDefault()
				// @ts-ignore
				console.log(e.target[0].value)
				// set state to thinking

				// make api request
				console.log(window)
			}} />
		</div>
	);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
