import React, {useMemo} from 'react'
import { TankState } from '../../services'
import css from './tank-widget.module.css'

export type TankWidgetProps = {
	tankState: TankState
}

export const TankWidget: React.FC<TankWidgetProps> = ({tankState}) => {
	const percent = useMemo(() => (
		Math.ceil(tankState.tank.level / tankState.tank.capacity * 100)
	), [tankState])
	return (
		<div className={css.root}>
			<h4>{tankState.tank.name}</h4>

			<h2>{tankState.tank.level} / {tankState.tank.capacity}</h2>
			<h3>{percent}%</h3>

			{tankState.message && <h4 className={css.message}>{tankState.message}</h4>}

		</div>
	)

}