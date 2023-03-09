// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use binggpt::Bing;
use dotenv::dotenv;
use tauri::{
    ActivationPolicy, AppHandle, CustomMenuItem, GlobalShortcutManager, Manager, Menu, SystemTray,
    SystemTrayEvent, SystemTrayMenu,
};

#[tauri::command]
fn ask_bing(query: &str) -> String {
    dotenv().ok();

    let _bing_cookie = std::env::var("BING_COOKIE").expect("BING_COOKIE must be set in '.env'.");

    return format!("Hello, {}! You've been greeted from Rust!", query);
}

fn tray() -> SystemTray {
    SystemTray::new().with_menu(
        SystemTrayMenu::new()
            .add_item(CustomMenuItem::new("clippy", "Clippy").accelerator("CmdOrCtrl+Shift+6"))
            .add_item(CustomMenuItem::new("quit", "Quit").accelerator("CmdOrCtrl+Q")),
    )
}

fn main() {
    #[allow(unused_mut)]
    let mut app = tauri::Builder::default()
        .menu(Menu::new())
        .setup(|_app| Ok(()))
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
        .expect("error while running tauri application");

    fn toggle_window(app_handle: &AppHandle) {
        let window = &app_handle.get_window("main").unwrap();

        if window.is_visible().unwrap() {
            window.hide().expect("Failed to hide window");
        } else {
            window.show().expect("Failed to show window");
        }
    }

    #[cfg(target_os = "macos")]
    app.set_activation_policy(ActivationPolicy::Accessory);

    app.run(|_app_handle, event| match event {
        tauri::RunEvent::Ready => {
            let app_handle = _app_handle.clone();
            app_handle
                .global_shortcut_manager()
                .register("CmdOrCtrl+Shift+6", move || toggle_window(&app_handle))
                .unwrap();
        }
        tauri::RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
        }
        _ => {}
    });
}
