import { FunctionComponent } from 'preact';
import { useContext } from 'preact/compat';

import useTimerState, { TimerState } from '@/logic/App/TimerState';
import { ConfigContext } from '@/logic/Config';
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
  const { state: timerState, onStartPeriod, onStop } = useTimerState();

  return (
    <div class="content">
      <h3 class="state-info">{formatState(timerState)}</h3>
      <TimeBlock timerState={timerState} onStartPeriod={onStartPeriod} onStop={onStop} />
    </div>
  );
};

export default App;
