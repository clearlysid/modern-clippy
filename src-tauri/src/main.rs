// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use dotenv::dotenv;
use tauri::{
    ActivationPolicy, AppHandle, CustomMenuItem, GlobalShortcutManager, Manager, SystemTray,
    SystemTrayEvent, SystemTrayMenu,
};

#[tauri::command]
fn ask_bing(query: &str) -> String {
    dotenv().ok();

    let bing_cookie = std::env::var("BING_COOKIE").expect("BING_COOKIE must be set.");

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
        .setup(|_app| Ok(()))
        .system_tray(tray())
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => toggle_window(app),
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "clippy" => toggle_window(app),
                "quit" => std::process::exit(0),
                _ => {}
            },
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![
            ask_bing,
            hide_window,
            reload_window
        ])
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    fn toggle_window(app: &AppHandle) {
        if app.get_window("main").is_some() {
            app.get_window("main")
                .unwrap()
                .hide()
                .expect_err("Failed to hide Clippy");
        } else {
            app.get_window("main")
                .unwrap()
                .show()
                .expect_err("Failed to show Clippy");
        }
    }

    #[tauri::command]
    fn hide_window() {
        println!("hide window")
    }

    #[tauri::command]
    fn reload_window() {
        println!("reload window")
    }

    #[cfg(target_os = "macos")]
    app.set_activation_policy(ActivationPolicy::Accessory);

    app.run(|_app_handle, event| match event {
        tauri::RunEvent::Ready => {
            _app_handle
                .global_shortcut_manager()
                .register("CmdOrCtrl+Shift+6", move || println!("Shortcut invoked!"))
                .unwrap();
        }
        tauri::RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
        }
        _ => {}
    });
}
