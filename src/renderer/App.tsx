import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import Menu from "./components/Menu";
import Form from "./components/Form";
import Chat from "./components/Chat";
import Sample from "./components/sample.json";

import type { ChatMessage } from "./types";
import type { BingResponse } from "./types";

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
	// 	{
	// 		type: "incoming",
	// 		data: Sample[0]
	// 	},
	// 	{
	// 		type: "outgoing",
	// 		data: "how tall is the eiffel tower"
	// 	},
	// ]

	const [thinking, setThinking] = useState<boolean>(false)
	const [lastChat, setLastChat] = useState<BingResponse | null>(null)
	const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

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
		if (api.askBing) askBing.current = api.askBing
	}, [])

	return (
		<div css={{
			padding: 24,
			rowGap: 8,
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "column",
		}}>
			<Menu />
			<Chat messages={messages} thinking={thinking} />
			<Form handleQuery={handleQuery} thinking={thinking} />
		</div>
	);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
