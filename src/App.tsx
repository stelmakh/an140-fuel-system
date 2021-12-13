import React, {useMemo, useState} from 'react';
import { MainController, MockValveService, TankAdapter, TankState, ValveAdapter, ValveState } from './services';
import { MockTankService } from './services/tank-adapter/mock-tank-service';
import css from './App.module.css';
import { TankWidget, ValveWidget, ProjectedHoursWidget } from './components';

const App = () => {
  const [ tankState, setTankState ] = useState<TankState[]>([])
  const [ valveState, setValveState ] = useState<ValveState>({isOpen: false})
  const [ projectedHours, setProjectedHours ] = useState<number>(0)

  const tankService = useMemo(() => new MockTankService(), [])
  const tanksAdapter = useMemo(() => new TankAdapter(tankService), [tankService])

  const valveService = useMemo(() => new MockValveService(), [])
  const valveAdapter = useMemo(() => new ValveAdapter(valveService), [valveService])

  const mainController = useMemo(() =>
    new MainController(
      valveAdapter,
      tanksAdapter,
      {
        setTankState,
        setValveState,
        setProjectedHours
      }
      )
  , [valveAdapter, tanksAdapter])

  return (
    <div className={css.root}>
      <div className={css.tanks}>
        {tankState.map(ts => (
          <TankWidget key={ts.tank.tankId} tankState={ts}/>
        ))}
      </div>

      <div className={css.projected}>
        <ProjectedHoursWidget projectedHours={projectedHours}/>
      </div>

      <div className={css.valve}>
        <ValveWidget
          isOpen={valveState.isOpen}
          errorMessage={valveState.errorMessage}
          onChangeState={mainController.setValveState}
        />
      </div>
    </div>
  );
}

export default App;
