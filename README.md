<p align="center">
	<a href="#">
		<img width="300" src="https://raw.githubusercontent.com/Symbux/Turbo/master/logo.svg">
	</a>
</p>


![Codecov](https://img.shields.io/codecov/c/github/Symbux/Turbo)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/Symbux/Turbo/Build)
![GitHub issues](https://img.shields.io/github/issues/Symbux/Turbo)
![NPM](https://img.shields.io/npm/l/@symbux/Turbo)
![npm (scoped)](https://img.shields.io/npm/v/@symbux/Turbo)
![npm](https://img.shields.io/npm/dw/@symbux/Turbo)

Turbo is a powerful command engine using internal event scheduling, dependency injection, and an ORM (unreleased) for creating scalable and powerful REST API / WebSocket based platforms with a solid plugin ecosystem for extending the core functionality.

<br>

---

<br>

## Installation

With Yarn:
```bash
yarn add @symbux/turbo
```

With NPM:
```bash
npm install --save @symbux/turbo
```

<br>

---

<br>

## Getting Started

```typescript
import { Engine, HttpPlugin } from '@symbux/turbo';

// Initialise engine instance.
const engine = new Engine({
	autowire: true,
});

// Use the http plugin.
engine.use(new HttpPlugin({
	port: 8080,
}));

// Start engine.
engine.start().catch((err) => {
	console.error(err);
});
```

<br>

---

<br>

## Features & Plugins

### Features

| Feature | Description |
| --- | --- |
| Dependency Injection | This is provided by [@symbux/injector](https://www.npmjs.com/package/@symbux/injector). |
| ORM | This is to come, and is currently unreleased. |
| Plugin System | The plugin system is a built-in registration system for adding extra services, see below for plugin list. |
| Controllers | The engine is based on a controller design, where you create controllers, where each plugin will offer functionality for registering and managing controllers.
| Built-In | We have various built-in plugins, see below for plugin list. You can easily add your own plugins as well! |

### Plugins

| Plugin | Description |
| --- | --- |
| HttpPlugin | The built-in HTTP plugin is based off of [Express](https://www.npmjs.com/package/express). |
| WsPlugin | The built-in WS plugin is based off of [Express-WS](https://www.npmjs.com/package/express-ws). |

<br>

---

<br>

## Future Development

* [ORM](https://www.npmjs.com/package/@symbux/orm) - An ORM for data management.
* [Discord](#) - A discord plugin, that offers SSO (single sign on) to discord with built-in bot support using the new slash commands.
* [UI](#) - A pre-built Vue based SSR framework for writing user interfaces for the framework (allowing other plugins to extend it).
* [Auction](#) - A plugin to support auction systems, using commission, timed, and live bidding (Extends UI).