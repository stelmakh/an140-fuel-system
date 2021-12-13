
import { ITankService, TankState } from "./types";

export interface ITankAdapter {
	getStates(): TankState[]
}

export class TankAdapter implements ITankAdapter {
	private tankService: ITankService

	constructor (tankService: ITankService) {
		this.tankService = tankService
	}

	public getStates = (): TankState[] => {
		return this.tankService.getStates()
	}
}