# 🚀 Frontend Forge

**Frontend Forge** is a modern CLI that transforms an existing **Next.js** project into a production-ready frontend architecture.

Instead of creating another starter project, Frontend Forge upgrades your existing project by adding a clean folder structure, connected starter files, optional modules, and best practices—without overwriting your existing code.

---

## ✨ Features

* 🏗️ Convert an existing Next.js project into a scalable architecture
* 📦 Multiple project architectures

  * Standard
  * Enterprise
  * Feature Based
* 🧩 Optional modules

  * Core
  * Axios
  * Zustand
* 📁 Intelligent project detection (`app/` or `src/app/`)
* 📦 Automatic dependency installation
* 📋 Automatic package manager detection

  * npm
  * pnpm
  * yarn
  * bun
* 🛡️ Safe file generation (never overwrites existing files)
* 🎯 Connected starter files that demonstrate the project structure
* ⚡ Beautiful interactive CLI experience

---

# 📦 Installation

### Run directly

```bash
npx @parimal/frontend-forge init
```

or install globally

```bash
npm install -g @parimal/frontend-forge
```

then

```bash
frontend-forge init
```

---

# 🚀 Quick Start

Create a new Next.js project

```bash
npx create-next-app@latest my-app
```

Move into the project

```bash
cd my-app
```

Run Frontend Forge

```bash
frontend-forge init
```

Choose:

* Architecture
* Modules

That's it.

Your project is now transformed into a production-ready frontend foundation.

---

# 🏛️ Architectures

## Standard

Perfect for:

* Small projects
* MVPs
* Personal projects

Includes a clean and minimal folder structure.

---

## Enterprise

Perfect for:

* Large applications
* Teams
* Long-term maintenance

Layer-based architecture with scalable project organization.

---

## Feature Based

Perfect for:

* Complex products
* Domain-driven applications
* Large feature teams

Everything is organized by feature with a shared layer.

---

# 📦 Modules

## Core

Includes:

* Providers
* Components
* Hooks
* Utilities
* Constants
* Services
* Types
* Store
* Configuration
* Assets

---

## Axios

Installs Axios and generates starter API service files.

---

## Zustand

Installs Zustand and creates a starter global store.

---

# 🛡️ Safe Generation

Frontend Forge never overwrites your existing files.

If a file already exists, it is skipped automatically.

This allows you to run the CLI multiple times without losing your work.

---

# ⚙️ Supported Package Managers

Frontend Forge automatically detects your project and uses the correct package manager.

* npm
* pnpm
* yarn
* bun

---

# 📂 Supported Frameworks

Current

* ✅ Next.js

Planned

* React
* Vite
* Electron
* React Native

---

# 🗺️ Roadmap

* React support
* Vite support
* Better Auth module
* Directus module
* React Query module
* Prisma module
* Drizzle module
* Docker support
* Storybook support
* Testing presets
* AI-ready starter modules

---

# 🤝 Contributing

Contributions, ideas, bug reports, and feature requests are always welcome.

If you find an issue or have an idea for improvement, please open an Issue or submit a Pull Request.

---

# 📄 License

MIT License

---

Made with ❤️ by **Parimal Sharma**
