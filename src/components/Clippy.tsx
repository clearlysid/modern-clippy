
export default function Clippy({ thinking }: { thinking: boolean }) {
	return <img
		src={'../clippy-demo.gif'}
		alt="clippy"
		css={{
			width: 100,
			position: "absolute",
			right: 0,
			bottom: 36
		}} />

}