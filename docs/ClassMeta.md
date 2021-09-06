# Class Metadata.

All classes (modules) that are registered must have a default set of meta data, see below.

| Key Name | Description | Value Type |
| - | - | - |
| `t:type` | This should be the type of the module, like service, controller, etc. | `String` |
| `t:name` | The name of the module class. | `String` |
| `t:plugin` | The services that this controller can be used by. | `Array` |
| `t:methods` | An object of methods, and service specific information about each method. | `Object` |
| `t:auth` | An object that defines the auth requirements for the class and methods. | `Object` |
| `t:<service>:<any>` | A service should add it's own details on top. | `Unknown` |

### Methods Structure.

Example of a HTTP & WS mixed combination.

```typescript
{
	'index': {
		http: {
			path: '/',
			method: 'GET',
		},
		ws: {
			allowed: true,
		},
	},
	'create': {
		http: {
			path: '/create',
			method: 'POST',
		},
		ws: {
			allowed: true,
		},
	},
}
```