import { motion, AnimatePresence } from "framer-motion"
import { ChatMessage } from "../types"
import Text from "./Text"

export default function Chat({ messages, thinking }: { messages: ChatMessage[], thinking: boolean }) {

	return <main style={{
		height: '100%',
		overflow: 'scroll',
		display: 'flex',
		flexDirection: 'column-reverse',
		scrollBehavior: 'smooth',
	}}>
		<div style={{
			height: 'max-content',
			rowGap: 12,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-end',
			width: '100%',
		}}>
			<AnimatePresence initial={false} mode="popLayout">
				{messages.map((c, i) => <Text index={i} key={i} data={c.data} type={c.type} />)}
			</AnimatePresence>
		</div>
	</main>
}