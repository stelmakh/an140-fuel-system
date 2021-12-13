import { ValveAdapter, ValveState } from "../valve-adapter";
import { TankAdapter, TankState } from "../tank-adapter";
import { LevelsInfo } from "./types";

const CONSUMPTION_PER_HOUR = 560
export interface IMainControllerHandlers {
	setTankState(tankState: TankState[]): void
	setValveState(valveState: ValveState): void
	setProjectedHours(projectedHours: number): void
}

export class MainController {
	private valveAdapter: ValveAdapter
	private tankAdapter: TankAdapter

	public levelsInfo: LevelsInfo
	public valveState: ValveState

	private handlers: IMainControllerHandlers

	constructor(valveAdapter: ValveAdapter, tankAdapter: TankAdapter, handlers: IMainControllerHandlers) {
		this.valveAdapter = valveAdapter;
		this.tankAdapter = tankAdapter;
		this.handlers = handlers;

		this.valveState = this.updateValveState();
		this.levelsInfo = this.updateLevelsInfo()
	}

	public setValveState = (isOpen: boolean): void => {
		this.valveState = this.updateValveState(this.valveAdapter.setState(isOpen))
	}

	private updateValveState = (valveState = this.valveAdapter.getState()) => {
		this.handlers.setValveState(valveState)
		return this.valveState;
	}

	private updateLevelsInfo() {
		const tankStates = this.tankAdapter.getStates()
    const projectedHours = this.calculateProjectedHours()

		this.handlers.setTankState(tankStates)
		this.handlers.setProjectedHours(projectedHours)

		return {
			tankStates,
			projectedHours
		}
	}

	private calculateProjectedHours() {
		const tankStates = this.tankAdapter.getStates()

		const totalFuel = tankStates.reduce((total, state) =>
			total + state.tank.level
		, 0)

		return totalFuel / CONSUMPTION_PER_HOUR
	}

}