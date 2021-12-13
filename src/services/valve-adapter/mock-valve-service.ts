import { IValveService, ValveState } from "./types";

export class MockValveService implements IValveService {
	private state: boolean

	constructor() {
		this.state = false;
	}
	public getState = (): ValveState => {
		return {
			isOpen: this.state,
		}
	}

	public setState = (isOpen: boolean): ValveState => {
		this.state = isOpen;

		return {
			isOpen,
		}
	}

}