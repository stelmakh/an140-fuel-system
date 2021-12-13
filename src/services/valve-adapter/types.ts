export type ValveState = {
  isOpen: boolean
  errorMessage?: string
}

export interface IValveService {
	getState(): ValveState
  setState(isOpen: boolean): ValveState
}