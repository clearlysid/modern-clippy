import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { invoke } from '@tauri-apps/api/tauri'
import { appWindow } from "@tauri-apps/api/window";

import Menu from "./components/Menu";
import Form from "./components/Form";
import Chat from "./components/Chat";
import Hide from "./components/Hide";
import initialTexts from "./components/initialTexts";

import type { ChatMessage } from "./types";
import type { BingResponse } from "./types";
import Clippy from "./components/Clippy";

const App = () => {

	const initialMessages: ChatMessage[] = []
	// const initialMessages: ChatMessage[] = initialTexts

	const [thinking, setThinking] = useState<boolean>(false)
	const [lastChat, setLastChat] = useState<BingResponse | null>(null)
	const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

	const handleQuery = async (query: string) => {
		setMessages([...messages, { type: "outgoing", data: query }])

		const startThinking = setTimeout(() => setThinking(true), 2000)
		let response

		if (!lastChat) {
			response = await invoke('ask_bing', { query: query })
			// setLastChat(response)
		} else {
			response = await invoke('ask_bing', { query: query, lastChat: lastChat })
		}

		clearTimeout(startThinking)
		setThinking(false)

		console.log(response)

		setMessages([...messages,
		{ type: "outgoing", data: query },
		{ type: "incoming", data: response }
		])
	}

	const handleInfo = () => {
		let currentMessages: ChatMessage[] =
			[...messages, { type: "outgoing", data: "What is this app?" }]
		setMessages(currentMessages)

		const response: ChatMessage = {
			type: "incoming",
			data: "A weekend hack by @clearlysid to practice some code. Instead of ChatGPT, I reverse engineer Microsoft's new Bing Search API to respond. That way I'm not limited to any training dataset, and can answer anything by searching the web! I'm also open source, so you can see how I work."
		}

		const quip: ChatMessage = {
			type: "incoming",
			data: "Also, Sid really misses me and hates Siri and Cortana."
		}

		setTimeout(() => {
			setMessages([...currentMessages, response])
		}, 1000)

		setTimeout(() => {
			setMessages([...currentMessages, response, quip])
		}, 4000)
	}

	let unlisten;

	(async () => {
		unlisten = await appWindow.onFocusChanged(({ payload: focused }) => {
			focused ? appWindow.show() : appWindow.hide()
		})
	}
	)();

	useEffect(() => {
		return () => unlisten()
	}, [])

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
			<Chat messages={messages} />
			<Form handleQuery={handleQuery} thinking={thinking} />
			<Clippy thinking={thinking} />
			<Menu onTriggerInfo={handleInfo} onTriggerReset={() => {
				setMessages(null)
				setLastChat(null)
			}} />
		</motion.div>
	);
};

export default App
