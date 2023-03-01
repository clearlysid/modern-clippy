import { BrowserWindow } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const createMainWindow = () => {
	const mainWindow = new BrowserWindow({
		title: "Cortana X",
		width: 800,
		height: 600,
		show: false,
		// center: true,
		alwaysOnTop: true,
		resizable: false,
		minimizable: false,
		maximizable: false,
		fullscreenable: false,
		hiddenInMissionControl: true,
		skipTaskbar: true,
		acceptFirstMouse: true,
		titleBarStyle: 'hiddenInset',
		vibrancy: 'ultra-dark',
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	mainWindow.removeMenu();
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	return mainWindow
}