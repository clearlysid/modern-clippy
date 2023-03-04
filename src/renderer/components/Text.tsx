import Response from "./Response"

export default function Text({
	type,
	data
}: {
	// type: "incoming" | "outgoing",
	type: String,
	data: {} | string,
}) {

	if (typeof data === "string" && type === "outgoing") {
		return <div style={{
			background: '#161616',
			padding: '8px 12px',
			borderRadius: 12,
			maxWidth: '80%',
			marginBottom: 12,
			marginLeft: 'auto',
			marginRight: 0,
		}}>
			<p style={{
				color: "white",
				fontSize: 15,
				lineHeight: 1.5,
			}}>
				{data}
			</p>
		</div>
	}

	return <div>
		<Response response={data} />
	</div>
}