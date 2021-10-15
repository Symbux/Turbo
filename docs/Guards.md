# Guards

Authentication guards are a core part of Turbo's security system, and are based on the Symfony's own guards.

> Note: Each service will implement a basic guard, that will be used to extract information for your guards from this point you would create your own guard based on the service you want to use.

Example:

```typescript
import { Http, Guard, IGuard } from '@symbux/turbo';
import { Inject } from '@symbux/injector';
import AuthHelper from '../provider/auth';

// We name the guard here.
@Guard('http.main')
export default MainGuard extends Http.Guard implements IGuard {

	// Inject our custom module (which may do a database lookup or use an ORM).
	@Inject() private helper!: AuthHelper;

	// Simply checks if the `user-token` cookie exists.
	public async supports(context: Http.Context): Promise<boolean> {
		if (context.getCookies().includes('user-token')) return true;
		return false;
	}

	// This will actually be called by the framework.
	public async getCredentials(context: Http.Context): Promise<Record<string, any>> {
		const cookies = context.getCookies();
		return {
			token: cookies['user-token'],
		};
	}

	public async getUser(credentials: Record<string, any>): Promise<Record<string, any>> {
		const user = await this.helper.findUserByToken(credentials.token);
		if (!user) return false;
		return user;
	}

	public async onAuthenticated(user: Record<string, any>): Promise<void> {
		// This is a simple event, and used for logging purposes.
		console.log(`User ${user.username} is authenticated!`);
	}

	public async onUnauthenticated(err?: Error): Promise<void> {
		// This is a simple event, and used for logging purposes.
		if (err) console.error(err);
		console.log('User is not authenticated!');
	}
}
```