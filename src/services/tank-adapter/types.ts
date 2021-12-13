export type Tank = {
  tankId: number
  name: string
  capacity: number
  level: number
}

export type TankState = {
  tank: Tank
  message: string
}

export interface ITankService {
	getStates(): TankState[]
}