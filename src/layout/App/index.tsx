import { FunctionComponent } from 'preact';
import { useContext, useEffect } from 'preact/compat';

import { ServiceContext } from '@/service';
import { WORKER_NAME } from '@/workers/ServiceWorker';
import useTimerState, { TimerState } from '@/logic/App/TimerState';
import { ConfigContext } from '@/logic/Config';
import Const from '@/logic/Const';
import TimeBlock from './TimeBlock';

import './app.styl';

function formatState(state: TimerState) {
  const config = useContext(ConfigContext);

  switch (state.type) {
    case 'Stopped':
      return config.notStartedTitle;
    case 'Running':
      return config.periods[state.index].title;
  }
}

const App: FunctionComponent = () => {
  const { staticService } = useContext(ServiceContext);

  const { state: timerState, onStartPeriod, onStop } = useTimerState();

  useEffect(() => {
    navigator.serviceWorker.register(staticService.resolve(Const.WORKERS_DIR, WORKER_NAME).url);
  }, []);

  return (
    <>
      <div class="state-info-wrapper">
        <h3 class="state-info">{formatState(timerState)}</h3>
      </div>
      <TimeBlock timerState={timerState} onStartPeriod={onStartPeriod} onStop={onStop} />
    </>
  );
};

export default App;
