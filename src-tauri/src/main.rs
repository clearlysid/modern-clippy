// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use binggpt::Bing;
use dotenv::dotenv;
use tauri::{
    ActivationPolicy, AppHandle, CustomMenuItem, GlobalShortcutManager, Manager, Menu, SystemTray,
    SystemTrayEvent, SystemTrayMenu,
};

#[tauri::command]
async fn ask_bing(query: &str) -> Result<(), ()> {
    dotenv().ok();
    let _bing_cookie = std::env::var("BING_COOKIE").expect("BING_COOKIE must be set in '.env'.");

    // This bing instance expects a path to a file that contains the cookies
    // TODO: find a way to get it to expect just the cookie as a string
    let mut bing = Bing::new("~/.config/bing-cookies.json").await.unwrap();

    // The below code is pasted from the binggpt example itself
    // Lack of documentation means I don't understand how it works just yet
    bing.send_msg(query).await.unwrap();

    // receive message
    let mut index = 0;

    // loop until the chat is done
    loop {
        if bing.is_done() {
            break;
        }

        let Some(answer) = bing.recv_text().await.unwrap() else{
            continue;
        };

        // print the new part of the answer
        if !answer.is_empty() {
            println!("{}", utf8_slice::from(&answer, index));
            index = utf8_slice::len(&answer);
        }
    }

    // Need to return Ok(()) to prevent error
    // TODO: return the structure answer instead of just Ok(())
    return Ok(());
}

// Set up the system tray
fn tray() -> SystemTray {
    SystemTray::new().with_menu(
        SystemTrayMenu::new()
            .add_item(CustomMenuItem::new("clippy", "Clippy").accelerator("CmdOrCtrl+Shift+6"))
            .add_item(CustomMenuItem::new("quit", "Quit").accelerator("CmdOrCtrl+Q")),
    )
}

fn main() {
    // Create the app
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

    // Function to toggle the window visibility
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

    // Register the global shortcut and handle exit event
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
