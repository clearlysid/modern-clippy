import { BrowserWindow } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const createMainWindow = () => {
	const mainWindow = new BrowserWindow({
		title: "Modern Clippy",
		width: 800,
		height: 400,
		// transparent: true,
		show: false,
		center: true,
		alwaysOnTop: true,
		resizable: false,
		minimizable: false,
		// closable: false,
		maximizable: false,
		fullscreenable: false,
		skipTaskbar: true,
		// titleBarStyle: 'customButtonsOnHover',
		vibrancy: 'popover',
		trafficLightPosition: { x: 24, y: 24 },
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	mainWindow.removeMenu();
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	return mainWindow
}