// Prevents additional console window on Windows in release.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use binggpt::Bing;
use tauri::{
    ActivationPolicy, AppHandle, CustomMenuItem, GlobalShortcutManager, Manager, Menu, SystemTray,
    SystemTrayEvent, SystemTrayMenu,
};

// TODO: make this changeable in settings
const GLOBAL_SHORTCUT: &str = "CmdOrCtrl+`";

#[tauri::command]
async fn ask_bing(query: &str) -> Result<String, ()> {
    let mut bing = Bing::new("~/.config/bing-cookies.json").await.unwrap();

    bing.send_msg(query).await.unwrap();

    let mut answer = String::new();

    while !bing.is_done() {
        if let Some(text) = bing.recv_text_only().await.unwrap() {
            answer = text;
        }
    }

    return Ok(answer);
}

fn tray() -> SystemTray {
    SystemTray::new().with_menu(
        SystemTrayMenu::new()
            .add_item(CustomMenuItem::new("clippy", "Clippy").accelerator(GLOBAL_SHORTCUT))
            .add_item(CustomMenuItem::new("quit", "Quit").accelerator("CmdOrCtrl+Q")),
    )
}

fn main() {
    #[allow(unused_mut)]
    let mut app = tauri::Builder::default()
        .menu(Menu::new())
        .setup(|_app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = _app.get_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .system_tray(tray())
        .on_system_tray_event(|app_handle, event| match event {
            SystemTrayEvent::LeftClick { .. } => toggle_window(&app_handle),
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "clippy" => toggle_window(&app_handle),
                "quit" => std::process::exit(0),
                _ => {}
            },
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![ask_bing])
        .build(tauri::generate_context!())
        .expect("Error while building Clippy");

    fn toggle_window(app_handle: &AppHandle) {
        if let Some(window) = app_handle.get_window("main") {
            match window.is_visible() {
                Ok(true) => window
                    .hide()
                    .unwrap_or_else(|e| println!("Failed to hide window: {}", e)),
                Ok(false) => window
                    .show()
                    .unwrap_or_else(|e| println!("Failed to show window: {}", e)),
                Err(e) => println!("Failed to check window visibility: {}", e),
            }
        } else {
            println!("Window not found");
        }
    }

    #[cfg(target_os = "macos")]
    app.set_activation_policy(ActivationPolicy::Accessory);

    app.run(|_app_handle, event| match event {
        tauri::RunEvent::Ready => {
            let app_handle = _app_handle.clone();
            app_handle
                .global_shortcut_manager()
                .register(GLOBAL_SHORTCUT, move || toggle_window(&app_handle))
                .unwrap();
        }
        tauri::RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
        }
        _ => {}
    });
}
