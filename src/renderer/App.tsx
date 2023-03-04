import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import styled from "@emotion/styled"
import { Info, Settings } from "react-feather";
import Form from "./components/Form";
import Text from "./components/Text";
import Sample from './components/sample.json'

const Container = styled.div({
	padding: 24,
	rowGap: 8,
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
})

const App = () => {

	const askBing = useRef(null)
	const [chat, setChat] = useState<{ type: 'incoming' | 'outgoing', data: {} | string }[]>([
		{
			type: "outgoing",
			data: "how tall is the eiffel tower"
		},
		{
			type: "incoming",
			data: Sample[0]
		},
		{
			type: "outgoing",
			data: "how tall is the eiffel tower"
		},
		{
			type: "incoming",
			data: Sample[0]
		},
		{
			type: "outgoing",
			data: "how tall is the eiffel tower"
		},
	])
	const [thinking, setThinking] = useState(false)

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// don't proceed if response is pending
		if (thinking) return

		const query = (e.target as HTMLFormElement).querySelector('input').value

		// add query to chat
		setChat([...chat, { type: "outgoing", data: query }])

		return
		// set state to thinking
		setThinking(true)

		// send query to bing
		const response = await askBing.current(query)

		// add to chat
		setChat([...chat, { type: "incoming", data: response }])
		setThinking(false)
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
			<nav style={{
				width: '100%',
				height: 20,
				opacity: 0.5,
				columnGap: 20,
				display: 'flex',
				justifyContent: 'flex-end',
				alignItems: 'flex-end',
				// @ts-expect-error
				WebkitAppRegion: 'drag'
			}}>
				<Info size={18} color={"white"} />
				<Settings size={18} color={"white"} />
			</nav>
			<main style={{
				height: '100%',
				overflow: 'scroll',
				display: 'flex',
				flexDirection: 'column-reverse',
			}}>
				<div style={{
					height: 'max-content',
					rowGap: 12,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					width: '100%',
				}}>
					{chat.map((c, i) => <Text key={i} data={c.data} type={c.type} />)}
				</div>
			</main>
			<Form onSubmit={handleFormSubmit} />
		</Container>
	);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
