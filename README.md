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

The Turbo engine is a command-based framework for building API (and web) based applications using either built-in plugins or community/custom ones.

<br>

<p align="center">
	<a href="https://discord.gg/3YuNTEMJey" target="_blank">
		<img width="200" src="https://discord.com/assets/cb48d2a8d4991281d7a6a95d2f58195e.svg">
		<p align="center">Join us on Discord!</p>
	</a>
</p>

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
import { Engine, HttpPlugin, WsPlugin } from '@symbux/turbo';

// Initialise engine instance.
const engine = new Engine({
	autowire: true,
});

// Use the http plugin.
engine.use(new HttpPlugin({
	port: 8080,
}));

engine.use(new WsPlugin());

// Start engine.
engine.start().catch((err) => {
	console.error(err);
});
```

<br>

---

<br>

## Features & Plugins

Turbo comes with tons of great features and core plugins out of the box including Http and WebSocket plugins for running servers for both.

<br>

### Features

A list of available features:

| Feature | Description |
|---------|-------------|
| Controllers | Controllers are used to handle requests from a service, with the ability to use the same controller to serve many services. |
| Middleware | Middleware can be applied to controllers for authentication and authorization validation, like managing CORS, or IP blacklisting, alongside checking a token/login status for a user. |
| Autowire | The engine offers built-in autowiring for framework modules, like plugins, controllers, fibres, providers, tasks, and more. |
| Plugins | Plugins are used to extend the engine with new functionality, like adding new services (i.e. Discord bots), or more generic functionality. |
| Tasks | Tasks are used to run tasks based on a cron-style syntax, these can be used to run tasks on a schedule, or to run tasks as needed. |
| Fibres | Fibres are classes, that proxy exposed methods into a thread, allowing them to run in parallel but also freeing up your main thread for running intensive operations. |
| Authentication | Built in authentication decorators can be applied to a controller method to do checks against middleware set authentication data. |
| Registry | The engine provides a registry for storing data, this can be used to store data in memory, alongside the registry stores all modules that have been loaded into the engine. |
| Services | Services are classes that provide a service which can call controllers, and methods to run business logic, for example the HttpPlugin comes with a HttpService that sets up and manages an Express application, usually we suggest setting services up as plugins, see the source code `src/plugin/http` as an example. |

<br>

### Plugins

| Plugin | Description |
| --- | --- |
| HttpPlugin | The built-in HTTP plugin is based off of [Express](https://www.npmjs.com/package/express). |
| WsPlugin | The built-in WS plugin is based off of [Express-WS](https://www.npmjs.com/package/express-ws), will initialise an express server if the HttpPlugin is not initialised. |

<br>

---

<br>

## Future Development

* [ORM](https://www.npmjs.com/package/@symbux/orm) - An ORM for data management in MongoDB and MySQL.
* [DiscordPlugin](#) - A discord plugin, that offers SSO (single sign on) to discord with built-in bot support using the new slash commands.
* [Turbo CLI](#) - A command line interface for Turbo, to install plugins, boilerplate plugin projects and automate building and deploying Turbo applications.
* [UiPlugin](#) - A pre-built Vue based SSR framework for writing user interfaces for the framework (allowing other plugins to extend it).
* [AuctionPlugin](#) - A plugin to support auction systems, using commission, timed, and live bidding (Extends UI Plugin).
