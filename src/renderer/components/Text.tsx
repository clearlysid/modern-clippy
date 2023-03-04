import { motion } from "framer-motion";

export default function Text({
	type,
	data,
	index
}: { type: 'incoming' | 'outgoing', data: any, index?: number }) {

	let text
	let incoming = type === "incoming" ? true : false

	if (typeof data !== "string" && type === "incoming") {
		const parsedText = data.text.replace(/Bing/g, "Clippy")
		text = parsedText
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
			boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.4)',
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
		<p style={{
			color: "white",
			fontSize: 17,
			lineHeight: 1.5,
		}}>
			{text}
		</p>
	</motion.div>
}