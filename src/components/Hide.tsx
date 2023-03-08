import { appWindow } from '@tauri-apps/api/window';

export default function Hide() {
	return <div css={{ flex: 1 }} onClick={() => appWindow.hide()} />
}

