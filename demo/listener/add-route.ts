import { Inject } from '@symbux/injector';
import Engine from '../../src/index';
import { AbstractController, Event, Http } from '../../src/index';

@Event.Listener()
export default class AddRouteListener {
	@Inject('turbo.core') private engine!: Engine;

	@Event.On.BeforeInit()
	public async beforeInit(): Promise<void> {

		// Create a dynamic controller.
		@Http.Controller('/dynamicroute')
		class DynamicController extends AbstractController {

			@Http.Get(['/a', '/b', '/c'])
			public async onDynamicRoute(): Promise<Http.Response> {
				return new Http.Response(200, 'Dynamic routing works :o');
			}
		}

		// Let's register the controller.
		this.engine.registerSingle(DynamicController, {});
	}
}
