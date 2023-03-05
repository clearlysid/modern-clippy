import { BrowserWindow } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export const createMainWindow = () => {
	const mainWindow = new BrowserWindow({
		title: "Modern Clippy",
		width: 800,
		height: 600,
		transparent: true,
		show: false,
		hasShadow: false,
		center: true,
		resizable: false,
		alwaysOnTop: true,
		minimizable: false,
		// closable: false,
		maximizable: false,
		fullscreenable: false,
		skipTaskbar: true,
		acceptFirstMouse: true,
		darkTheme: true,
		type: 'panel',
		frame: false,
		// vibrancy: 'popover',
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	mainWindow.removeMenu();
	mainWindow.visibleOnAllWorkspaces = true;
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	return mainWindow
}