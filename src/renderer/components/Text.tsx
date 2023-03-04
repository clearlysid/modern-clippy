import styled from "@emotion/styled"
import { motion } from "framer-motion";

const MessageText = styled.p({
	color: "white",
	fontSize: 15,
	lineHeight: 1.5,
})

export default function Text({
	type,
	data,
	index
}: { type: 'incoming' | 'outgoing', data: any, index?: number }) {

	let text
	let incoming = type === "incoming" ? true : false

	if (typeof data !== "string" && type === "incoming") {
		text = data.text
	} else {
		text = data
	}

	if (!text) return

	return <motion.div
		key={index}
		layout
		style={{
			maxWidth: '80%',
			borderRadius: 12,
			padding: '8px 12px',
			width: 'fit-content',
			marginLeft: incoming ? 'auto' : 0,
			background: incoming ? '#3164ff' : '#000000',
		}}
		initial={{ opacity: 0, scale: 0.8, y: 100, x: incoming ? 20 : -20 }}
		animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
		exit={{ opacity: 0, scale: 0.8, y: 100, x: incoming ? 20 : -20 }}
		transition={{
			layout: {
				duration: index * 0.05,
				type: "spring",
			}
		}}
	>
		<MessageText>
			{text}
		</MessageText>
	</motion.div>
}