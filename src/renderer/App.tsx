import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import styled from "@emotion/styled"
import { Info, Settings, RefreshCw } from "react-feather";
import Form from "./components/Form";
import Chat from "./components/Chat";
import Sample from "./components/sample.json";
import type { ChatMessage } from "./types";

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

	const initialMessages: ChatMessage[] = []
	// [
	// 	{
	// 		type: "outgoing",
	// 		data: "how tall is the eiffel tower"
	// 	},
	// 	{
	// 		type: "incoming",
	// 		data: Sample[0]
	// 	},
	// 	{
	// 		type: "outgoing",
	// 		data: "how tall is the eiffel tower"
	// 	},
	// 	{
	// 		type: "incoming",
	// 		data: Sample[0]
	// 	},
	// 	{
	// 		type: "outgoing",
	// 		data: "how tall is the eiffel tower"
	// 	},
	// ]

	const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
	const [thinking, setThinking] = useState(false)
	const [lastChat, setLastChat] = useState<{} | null>(null)

	const handleQuery = async (query: string) => {
		setMessages([...messages, { type: "outgoing", data: query }])

		const startThinking = setTimeout(() => setThinking(true), 1000)

		let response

		if (!lastChat) {
			response = await askBing.current(query)
			setLastChat(response)
		} else {
			response = await askBing.current(query, lastChat)
		}

		clearTimeout(startThinking)
		setThinking(false)

		setMessages([...messages,
		{ type: "outgoing", data: query },
		{ type: "incoming", data: response }
		])
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
				// @ts-expect-error
				WebkitAppRegion: 'drag',
				backgroundColor: 'black',
				cursor: 'move',
				zIndex: 100
			}}>
				<Info size={18} color={"white"} />
				<Settings size={18} color={"white"} />
				<RefreshCw size={18} color={"white"} />
			</nav>

			<Chat messages={messages} thinking={thinking} />
			<Form handleQuery={handleQuery} thinking={thinking} />

		</Container>
	);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
