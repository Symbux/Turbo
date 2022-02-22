import { Event } from '../../src/index';

@Event.Listener()
export default class ExampleListener {

	@Event.On.BeforeInit()
	public async beforeInit(): Promise<void> {
		console.log('BEFORE INIT CALLED');
	}

	@Event.On.AfterInit()
	public async afterInit(): Promise<void> {
		console.log('AFTER INIT CALLED');
	}

	@Event.On.BeforeStart()
	public async beforeStart(): Promise<void> {
		console.log('BEFORE START CALLED');
	}

	@Event.On.AfterStart()
	public async afterStart(): Promise<void> {
		console.log('AFTER START CALLED');
	}

	@Event.On.BeforeStop()
	public async beforeStop(): Promise<void> {
		console.log('BEFORE STOP CALLED');
	}

	@Event.On.AfterStop()
	public async afterStop(): Promise<void> {
		console.log('AFTER STOP CALLED ');
	}

	private wait(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}
