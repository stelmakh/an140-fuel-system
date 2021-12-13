import React, {useMemo} from 'react'
import css from './projected-hours-widget.module.css'

const WARNING_THRESHOLD = 1

export type ProjectedHoursWidgetProps = {
	projectedHours: number
}

export const ProjectedHoursWidget: React.FC<ProjectedHoursWidgetProps> = ({projectedHours}) => {
	const [hours, minutes] = useMemo(() => {
		const h = Math.floor(projectedHours);
		const m = Math.floor((projectedHours - h) * 60);
		return [h, m]
	}, [projectedHours]) 

	return (
		<div className={css.root}>
			<h4>Прогнозований залишок</h4>
			<h2>{hours}г {minutes}хв</h2>
			{(hours < WARNING_THRESHOLD) && <h4 className={css.message}>{'Запас палива < 1 години'}</h4>}
		</div>
	)

}