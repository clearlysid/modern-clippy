import { useRef } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { ChatMessage } from "../types"
import Text from "./Text"

export default function Chat({ messages, thinking }: { messages: ChatMessage[], thinking: boolean }) {

	const scrollRef = useRef(null)
	const { scrollY } = useScroll({
		container: scrollRef
	})

	return <motion.main
		layout
		ref={scrollRef}
		style={{
			flex: 1,
			// maxHeight: '100%',
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
				{thinking && <Text data={'...'} type={"incoming"} />}
			</AnimatePresence>
		</div>
	</motion.main>
}