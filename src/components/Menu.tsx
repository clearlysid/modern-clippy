import { ReactEventHandler } from "react";
import { motion } from "framer-motion";
import { Info, Settings, RefreshCw, Move } from "react-feather";

export default function Menu({
	onTriggerInfo,
	onTriggerSettings,
	onTriggerReset
}: {
	onTriggerInfo?: ReactEventHandler<SVGElement>,
	onTriggerSettings?: ReactEventHandler<SVGElement>,
	onTriggerReset?: ReactEventHandler<SVGElement>
}) {

	const color = "white"
	const size = 16

	return <motion.nav layout
		css={{
			padding: 6,
			zIndex: 100,
			opacity: 0.6,
			columnGap: 20,
			marginTop: -16,
			display: 'flex',
			borderRadius: 8,
			alignSelf: 'center',
			width: 'max-content',
			justifyContent: 'flex-end',
			backgroundColor: 'black',
		}}>
		<Move size={size} color={color} data-tauri-drag-region />
		<Info size={size} color={color} onClick={onTriggerInfo} />
		<Settings size={size} color={color} onClick={onTriggerSettings} />
		<RefreshCw size={size} color={color} onClick={onTriggerReset} />
	</motion.nav>
}