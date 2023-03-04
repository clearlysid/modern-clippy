import { useRef } from "react"

export default function Form({
	onSubmit
}: {
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) {

	const inputRef = useRef<HTMLInputElement>(null)

	return <form style={{
		width: "100%",
		height: 84,
		display: "flex",
		background: "#161616",
		borderRadius: 8,
		overflow: "hidden",
		boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
		border: "1px solid rgba(0, 0, 0, 0.1)",
		alignSelf: "end",
	}}
		onSubmit={(e) => {
			e.preventDefault()
			onSubmit(e)
			inputRef.current.value = ""
		}}>
		<input
			type="text"
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
				paddingRight: 24,
				background: "none",
				border: "none",
				outline: "none",
				color: "white",
			}}>
			⏎
		</button>
	</form>
}