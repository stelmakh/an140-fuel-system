import { IValveService, ValveState } from "./types";

export interface IValveAdapter {
	getState(): ValveState
  setState(isOpen: boolean): ValveState
}

export class ValveAdapter implements IValveAdapter {
	private valveService: IValveService;

	constructor (valveService: IValveService) {
		this.valveService = valveService
	}

	public getState = (): ValveState => {
		return this.valveService.getState()
	}

	public setState = (isOpen: boolean): ValveState => {
		return this.valveService.setState(isOpen)
	}
}