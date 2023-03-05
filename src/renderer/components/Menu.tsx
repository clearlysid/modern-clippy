import { Info, Settings, RefreshCw, Move } from "react-feather";
import { motion } from "framer-motion";

export default function Menu() {
	return <motion.nav layout
		css={{
			width: 'max-content',
			marginTop: -16,
			padding: 6,
			opacity: 0.6,
			columnGap: 20,
			borderRadius: 8,
			display: 'flex',
			alignSelf: 'center',
			justifyContent: 'flex-end',
			backgroundColor: 'black',
			zIndex: 100,
		}}>
		<Move size={16} color={"white"} css={{ WebkitAppRegion: 'drag' }} />
		<Info size={16} color={"white"} />
		<Settings size={16} color={"white"} />
		<RefreshCw size={16} color={"white"} />
	</motion.nav>
}