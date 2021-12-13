
import { ITankService, Tank, TankState } from "./types";

export class MockTankService implements ITankService {
	private tanks: Tank[]

	constructor () {
		this.tanks = [
			{tankId: 1, name: 'Предвитратний', capacity: 3500, level: getRandomInt(2000, 3500)},
			{tankId: 2, name: 'Витратний', capacity: 2090, level: getRandomInt(10, 500)},
			{tankId: 3, name: 'Насосний 1', capacity: 260, level: 260},
			{tankId: 4, name: 'Насосний 2', capacity: 260, level: 260},
		]
	}

	public getStates = (): TankState[] => {
		return this.tanks.map(tank => ({
			tank: tank,
			message: tank.level < tank.capacity * 0.2 ? 'Залишок <20%' : ''
		}))
	}
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
