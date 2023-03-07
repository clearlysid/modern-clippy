// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
    ActivationPolicy, CustomMenuItem, GlobalShortcutManager, Manager, SystemTray, SystemTrayEvent,
    SystemTrayMenu, WindowBuilder, WindowUrl,
};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

fn main() {
    #[allow(unused_mut)]
    let mut app = tauri::Builder::default()
        .setup(|_app| Ok(()))
        .system_tray(
            SystemTray::new().with_menu(
                SystemTrayMenu::new()
                    .add_item(
                        CustomMenuItem::new("summon", "Clippy")
                            .accelerator("CommandOrControl+Shift+6"),
                    )
                    .add_item(
                        CustomMenuItem::new("quit", "Quit").accelerator("CommandOrControl+Q"),
                    ),
            ),
        )
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                // stage::init(app);
                // println!("Left click on tray icon");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "summon" => {
                    // TODO: find out what's the best way to "store" preferences?
                    if app.get_window("main").is_some() {
                        app.get_window("main")
                            .unwrap()
                            .show()
                            .expect_err("Failed to show Clippy");
                    } else {
                        std::process::exit(0);
                    }
                }
                "quit" => {
                    std::process::exit(0);
                }
                _ => {}
            },
            _ => {}
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    #[cfg(target_os = "macos")]
    app.set_activation_policy(ActivationPolicy::Accessory);

    app.run(|_app_handle, event| match event {
        tauri::RunEvent::Ready => {
            _app_handle
                .global_shortcut_manager()
                // TODO: make keyboard shortcut customizable
                .register("CmdOrCtrl+Shift+6", move || {
                    // stage::init(&_app_handle);
                })
                .unwrap();
        }
        tauri::RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
        }
        _ => {}
    });
}
