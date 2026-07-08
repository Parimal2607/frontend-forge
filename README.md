# frontend-init

`frontend-init` is a CLI that upgrades an existing Next.js project into a structured, production-ready starter architecture.

It keeps your project intact and adds architecture-guided folders, starter code, module support, dependency installation, and safe non-overwriting file generation.

## Features

- Detects existing Next.js projects before running
- Supports architecture selection:
  - Standard
  - Enterprise
  - Feature Based
- Supports module selection:
  - Core
  - Axios
  - Zustand
- Detects package manager automatically (`npm`, `pnpm`, `yarn`, `bun`)
- Installs module dependencies before copying files
- Safe copy behavior (never overwrites existing files)
- Adapts to `app/` or `src/app/` project structures
- Provides polished CLI UX (spinners, validation, summary)

## Installation

Install globally:

```bash
npm install -g @parimal/frontend-init
```

Or run directly with `npx`:

```bash
npx @parimal/frontend-init init
```

## Usage

```bash
frontend-init init
```

## Quick Start

1. Create a Next.js app (or use an existing one)
2. Move into the project root
3. Run:

```bash
frontend-init init
```

4. Choose architecture and modules
5. Let the CLI install dependencies and generate files
6. Start developing

## Supported Frameworks

- Next.js (current stable support)

## Available Architectures

- **Standard**: simple, flat structure for small projects
- **Enterprise**: layered structure for medium/large apps
- **Feature Based**: feature-first organization with shared layer

## Available Modules

- **Core**: starter components, hooks, providers, utilities
- **Axios**: dependency metadata and install wiring
- **Zustand**: dependency metadata and install wiring

## Example CLI Flow

```text
Frontend Init
Detecting project... Success
Selecting architecture... Success
Selecting modules... Success
Installing dependencies... Success
Copying architecture... Success
Copying modules... Success
Finishing... Success
```

## Roadmap

- Additional framework support
- More optional modules
- Optional template presets
- Expanded architecture examples

## License

MIT
