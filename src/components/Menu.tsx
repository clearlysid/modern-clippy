import { Info, Settings, RefreshCw, Move } from "react-feather";
import { motion } from "framer-motion";
import { ReactEventHandler, SyntheticEvent } from "react";

export default function Menu({
	onTriggerInfo,
	onTriggerSettings
}: {
	onTriggerInfo?: ReactEventHandler<SVGElement>,
	onTriggerSettings?: ReactEventHandler<SVGElement>
}) {
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
		<Move size={16} color={"white"} css={{ WebkitAppRegion: 'drag' }} />
		{
			onTriggerInfo &&
			<Info size={16} color={"white"} onClick={onTriggerInfo} />
		}
		{
			onTriggerSettings && <Settings size={16} color={"white"} onClick={onTriggerSettings} />
		}
		<RefreshCw size={16} color={"white"} onClick={() => api.reloadWindow()} />
	</motion.nav>
}