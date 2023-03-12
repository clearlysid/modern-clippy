# Modern Clippy

This is a fun, lightweight and quick way to use the new [Microsoft Bing](https://www.bing.com/new) in a Spotlight-style interface. Just hit a keystroke (`Cmd/Ctrl + Caps Lock`, by default) and type away! Get precise and natural answers + waves of nostalgia on the way. Hope you enjoy!

https://user-images.githubusercontent.com/30227512/224573668-676a11e8-0fd0-4182-9e66-4ed82d1dbc1e.mp4

## Downloads

> 🚧 WIP — Coming Soon.

## About

🚧 I don't intend to support this software long-term.

This project is simply for me to get better at [Rust](https://github.com/rust-lang/rust) and some of my favorite frontend tech at the moment: [Tauri](https://tauri.app), [Framer Motion](https://www.framer.com/motion/) and [Rive](https://rive.app). It is made primarily for learning purposes only.

Happy to merge PRs if it makes meaningful improvements.

## Development

The UI is written in Typescript/React and the "backend" in Rust. You need both package managers: `yarn` (JS) and `cargo` (Rust) to work on this.

1. Install all dependencies by running `yarn`
2. Spin up a development version using `yarn tauri dev`
3. Cargo automatically installs Rust crates when you run `yarn tauri xxxxx`
4. Build for production locally with: `yarn tauri build`
