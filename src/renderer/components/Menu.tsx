import { Info, Settings, RefreshCw } from "react-feather";

export default function Menu() {
	return <nav
		css={{
			width: '100%',
			height: 20,
			opacity: 0.5,
			columnGap: 20,
			display: 'flex',
			justifyContent: 'flex-end',
			backgroundColor: 'black',
			zIndex: 100,
			cursor: 'move', // this doesn't work with WebkitAppRegion
			WebkitAppRegion: 'drag',
		}}>
		<Info size={18} color={"white"} />
		<Settings size={18} color={"white"} />
		<RefreshCw size={18} color={"white"} />
	</nav>
}