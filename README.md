# electron-with-bun-js

A modern Electron-based desktop application that serves as a container for a Vue 3 + Vite web interface. The application uses TypeScript for the main and preload processes, with Bun as the build tool and runtime. It exposes a secure IPC bridge to the renderer process via contextBridge.

## Overview

electron-with-bun-js is a desktop application framework built with Electron that wraps a Vue 3 + Vite user interface. The main process is written in TypeScript and compiled with Bun, while the renderer process loads a pre-built Vue application from the `src-ui` directory. The application implements secure inter-process communication (IPC) using Electron's contextBridge API.

## Features

- **Electron 28.x** - Cross-platform desktop application framework
- **Vue 3 + Vite** - Modern reactive UI framework with fast build tooling
- **Bun** - All-in-one JavaScript runtime and build tool
- **TypeScript** - Type-safe development for main and preload processes
- **Secure IPC** - contextBridge-based communication between main and renderer
- **Multi-platform** - Builds for Windows, macOS, and Linux
- **electron-builder** - Professional packaging and distribution

## Prerequisites

Before you begin, ensure you have the following installed:

- **Bun** (v1.0.0 or higher) - Install from [https://bun.sh](https://bun.sh)
- **Node.js** (v18 or higher) - Required by Electron
- **Git** - For version control (optional)
- A code editor like **VS Code** recommended

## Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/kernkode/electron-with-bun-js
cd electron-with-bun-js

# Install dependencies
bun install
```

## Development

Start the application in development mode:

```bash
bun run dev
```

This command:
1. Watches the TypeScript files in `src/` for changes
2. Launches Electron with debugging enabled on port 5858

The application will automatically reload when you make changes to the source files.

## Building

### Build TypeScript Sources

Compile the main, preload, and renderer scripts:

```bash
bun run build
```

### Run in Production Mode

Build and start the application:

```bash
bun run start
```

### Package for Distribution

Create distributable packages for different platforms:

```bash
# Build for current platform
bun run dist

# Windows only
bun run dist:win

# macOS only
bun run dist:mac

# Linux only
bun run dist:linux
```

### Quick Package (Unpacked)

Create an unpacked directory (useful for testing):

```bash
bun run pack
```

## Project Structure

```
electron-with-bun-js/
├── src/                      # Main process source files
│   ├── main.ts              # Electron main process entry point
│   ├── preload.ts           # Secure bridge (contextBridge)
│   ├── renderer.ts          # Renderer-side IPC communication
│   └── types/
│       └── global.d.ts      # TypeScript declarations for electronAPI
├── src-ui/                  # Vue 3 + Vite frontend (pre-built)
│   ├── index.html          # Main HTML entry point
│   └── assets/             # Compiled JS, CSS, and assets
├── dist/                   # Compiled TypeScript output
├── release/                # Packaged application output
├── build/                  # Build resources (icons, etc.)
├── scripts/                # Build and utility scripts
├── package.json            # Project configuration and dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Architecture

### Main Process (`src/main.ts`)

The main process creates the BrowserWindow and manages the application lifecycle. It loads the Vue application from `src-ui/index.html` and the preload script from `dist/preload.js`.

### Preload Script (`src/preload.ts`)

The preload script uses contextBridge to expose a secure API (`window.electronAPI`) to the renderer process. This allows the Vue application to communicate with the main process without exposing Node.js APIs directly.

### Renderer (`src/renderer.ts`)

The renderer script demonstrates how to use the exposed electronAPI to send and receive messages between the renderer and main processes.

### IPC Communication

The exposed API provides two methods:

- `sendMessage(channel: string, data: unknown)` - Send messages to the main process
- `onMessage(channel: string, callback: (data: unknown) => void)` - Receive messages from the main process

Example usage in the renderer:

```typescript
// Send a message to the main process
window.electronAPI.sendMessage('app-loaded', { version: '1.0.0' });

// Listen for messages from the main process
window.electronAPI.onMessage('from-main', (data) => {
    console.log('Message from main process:', data);
});
```

## Configuration

### Package.json

Key configuration options in `package.json`:

- `name` - Application name
- `version` - Application version
- `main` - Entry point for Electron
- `build` - electron-builder configuration

### electron-builder

The build configuration supports:
- **Windows**: NSIS installer and portable executable
- **macOS**: DMG and ZIP
- **Linux**: AppImage and DEB

### TypeScript

The project uses strict TypeScript configuration with:
- ES2022 target
- CommonJS module format
- DOM and ES2022 type libraries

## License

See the `LICENSE` file in the root directory for details.

## Troubleshooting

### Build Errors

If you encounter build errors, try:

```bash
# Clean and rebuild
rm -rf dist
bun run build
```

### Missing Dependencies

Reinstall dependencies:

```bash
bun install
```

### Development Tools Not Opening

The development tools open automatically when `NODE_ENV=development`. To enable manually, modify `src/main.ts`:

```typescript
if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
}
```

## Additional Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [Bun Documentation](https://bun.sh/docs)
- [Vue 3 Documentation](https://vuejs.org/guide/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [electron-builder Documentation](https://www.electron.build/)

---

Built with Electron, Bun, Vue 3, and TypeScript
