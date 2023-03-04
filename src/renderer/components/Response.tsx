import sample from './sample.json';

export default function Response({ response = sample }: { response: any }) {

	return <div style={{
		background: '#3164ff',
		padding: '8px 12px',
		borderRadius: 12,
		maxWidth: '80%'
	}}>
		<p style={{
			color: "white",
			fontSize: 15,
			lineHeight: 1.5,
		}}>
			{response?.detail?.text}
		</p>
	</div>
}