import { useRef } from "react"
import { motion } from "framer-motion"

export default function Form({ handleQuery, thinking }: {
	thinking: boolean,
	handleQuery: (query: string) => void
}) {

	const inputRef = useRef<HTMLInputElement>(null)

	return <motion.form
		layout
		style={{
			height: 84,
			width: "100%",
			display: "flex",
			borderRadius: 8,
			alignSelf: "end",
			overflow: "hidden",
			background: "#161616",
			boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
			border: "1px solid rgba(255, 255, 255, 0.2)",
		}}
		onSubmit={(e) => {
			e.preventDefault()
			if (thinking) return

			handleQuery(inputRef?.current?.value)
			inputRef.current.value = ""

		}}>
		<input
			autoFocus
			type="text"
			placeholder="Ask clippy anything!"
			ref={inputRef}
			style={{
				width: "100%",
				height: "100%",
				border: "none",
				outline: "none",
				paddingLeft: 24,
				background: "none",
				fontSize: 20,
				letterSpacing: 0.4,
				color: "white",
			}} />
		<button
			type="submit"
			style={{
				padding: "0 24px",
				margin: 4,
				background: "#0000003c",
				border: "none",
				borderRadius: 8,
				outline: "none",
				color: "white",
				cursor: "pointer",
			}}>
			⏎
		</button>
		<img
			src={'../assets/clippy-demo.gif'}
			alt="clippy"
			css={{
				width: 100,
				position: "absolute",
				right: 0,
				bottom: 36
			}} />
	</motion.form>
}