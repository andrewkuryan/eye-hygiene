import { FunctionComponent } from 'preact';
import { useContext, useEffect } from 'preact/compat';

import { ServiceContext } from '@/service';
import { WORKER_NAME } from '@/workers/ServiceWorker';
import useTimerState from '@/logic/App/TimerState';
import Const from '@/logic/Const';
import TimeBlock from './TimeBlock';
import StatesCarousel from './StateInfo/StatesCarousel';

import './app.styl';

const App: FunctionComponent = () => {
  const { staticService } = useContext(ServiceContext);

  const { state: timerState, onStartPeriod, onStop } = useTimerState();

  useEffect(() => {
    navigator.serviceWorker.register(staticService.resolve(Const.WORKERS_DIR, WORKER_NAME).url);
  }, []);

  return (
    <>
      <StatesCarousel timerState={timerState} />
      <TimeBlock timerState={timerState} onStartPeriod={onStartPeriod} onStop={onStop} />
    </>
  );
};

export default App;
