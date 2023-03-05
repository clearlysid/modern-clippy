import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";

import Menu from "./components/Menu";
import Form from "./components/Form";
import Chat from "./components/Chat";
import Hide from "./components/Hide";
import initialTexts from "./components/initialTexts";

import type { ChatMessage } from "./types";
import type { BingResponse } from "./types";

const App = () => {

	// const initialMessages: ChatMessage[] = []
	const initialMessages: ChatMessage[] = initialTexts

	const [thinking, setThinking] = useState<boolean>(false)
	const [lastChat, setLastChat] = useState<BingResponse | null>(null)
	const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

	const handleQuery = async (query: string) => {
		setMessages([...messages, { type: "outgoing", data: query }])

		const startThinking = setTimeout(() => setThinking(true), 2000)

		let response

		if (!lastChat) {
			response = await api.askBing(query)
			setLastChat(response)
		} else {
			response = await api.askBing(query, lastChat)
		}

		clearTimeout(startThinking)
		setThinking(false)

		setMessages([...messages,
		{ type: "outgoing", data: query },
		{ type: "incoming", data: response }
		])
	}

	return (
		<motion.div
			layout
			css={{
				rowGap: 8,
				padding: 8,
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}>
			<Hide />
			<Chat messages={messages} thinking={thinking} />
			<Form handleQuery={handleQuery} thinking={thinking} />
			<Menu />
		</motion.div>
	);
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
