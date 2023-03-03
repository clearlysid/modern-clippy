import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import styled from "@emotion/styled"
import { Info, Settings } from "react-feather";
import Form from "./components/Form";
import Response from "./components/Response";

const Container = styled.div({
	padding: 24,
	width: "100%",
	height: "100%",
	display: "flex",
	alignItems: "center",
	flexDirection: "column",
	justifyContent: "center",
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
			<div style={{ height: '100%', width: '100%' }}>
				<nav style={{
					width: '100%',
					opacity: 0.5,
					columnGap: 20,
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'flex-end',
					// @ts-expect-error
					webkitAppRegion: 'drag'
				}}>
					<Info size={18} color={"white"} />
					<Settings size={18} color={"white"} />
				</nav>
				<Response />
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
