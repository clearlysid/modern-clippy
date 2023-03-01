import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Form from "./components/Form";
import styled from "@emotion/styled"

const Container = styled.div({
	padding: 24,
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	background: "#f5f5f5"
})

const App = () => {

	const askBing = useRef(null)

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const query = (e.target as HTMLFormElement).querySelector('input').value
		// set state to thinking

		const response = await askBing.current(query)
	}

	useEffect(() => {
		// @ts-expect-error
		if (window.api.askBing) {
			// @ts-expect-error
			askBing.current = window.api.askBing
		}
	}, [])

	return (
		<Container>
			<div style={{ height: '100%' }}>
				<h1>Modern Clippy</h1>
			</div>
			<Form onSubmit={handleFormSubmit} />
		</Container>
	);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
