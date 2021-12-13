import React, {useCallback} from 'react'
import css from './valve-widget.module.css'

export type ValveWidgetProps = {
	isOpen: boolean
	errorMessage?: string
	onChangeState(isOpen: boolean): void
}

export const ValveWidget: React.FC<ValveWidgetProps> = ({isOpen, errorMessage, onChangeState}) => {
	const handleChangeState = useCallback(() => onChangeState(!isOpen), [isOpen, onChangeState])

	return (
		<div className={css.root}>
			<h4>Кран централізованої заправки</h4>
			<h2>{isOpen? 'ВІДКРИТИЙ' : 'ЗАКРИТИЙ'}</h2>
			{errorMessage && <h4 className={css.message}>{errorMessage}</h4>}
			<button onClick={handleChangeState}>{isOpen ? 'Закрити КЦЗ' : 'Відкрити КЦЗ'}</button>
		</div>
	)

}