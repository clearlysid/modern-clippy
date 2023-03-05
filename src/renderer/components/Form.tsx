import { useRef } from "react"
import { motion } from "framer-motion"

export default function Form({ handleQuery, thinking }: {
	thinking: boolean,
	handleQuery: (query: string) => void
}) {

	const inputRef = useRef<HTMLInputElement>(null)

	return <motion.form layout style={{
		width: "100%",
		height: 84,
		display: "flex",
		background: "#161616",
		borderRadius: 8,
		overflow: "hidden",
		boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
		border: "1px solid rgba(255, 255, 255, 0.2)",
		alignSelf: "end",
	}}
		onSubmit={(e) => {
			e.preventDefault()
			if (thinking) return
			handleQuery(inputRef.current.value)
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
	</motion.form>
}