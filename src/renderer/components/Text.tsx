import styled from "@emotion/styled"
import type { ChatMessage } from "../types";

const MessageBubble = styled.div(props => ({
	padding: '8px 12px',
	borderRadius: 12,
	maxWidth: '80%',
	background: props.incoming ? '#3164ff' : '#000000',
	marginLeft: props.incoming ? 'auto' : 0,
	width: 'fit-content'
}))

const MessageText = styled.p({
	color: "white",
	fontSize: 15,
	lineHeight: 1.5,
})

export default function Text({
	type,
	data
}: ChatMessage) {

	let text
	let incoming = type === "incoming" ? true : false

	if (typeof data !== "string" && type === "incoming") {
		text = data.text
	} else {
		text = data
	}

	if (!text) return

	return <MessageBubble incoming={incoming}>
		<MessageText>
			{text}
		</MessageText>
	</MessageBubble>
}