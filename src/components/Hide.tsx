import { invoke } from '@tauri-apps/api/tauri'

export default function Hide() {
	return <div css={{ flex: 1 }} onClick={() => invoke('hide_window')} />
}

