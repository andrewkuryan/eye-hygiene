import { FunctionComponent } from 'preact';
import { useState } from 'preact/compat';

import { State } from '@/logic/App/State';
import { defaultConfig, ConfigContext } from '@/logic/App/Config';
import TimeBlock from './TimeBlock';

import './app.styl';

function formatState(state: State) {
  switch (state) {
    case 'Stopped':
      return 'Not started';
    case 'Work':
      return 'Time to work';
    case 'Countdown':
      return 'Preparation for rest';
    case 'Rest':
      return 'Rest time';
  }
}

const App: FunctionComponent = () => {
  const [state, setState] = useState<State>('Stopped');

  const onStartWork = () => setState('Work');

  const onStartCountdown = () => setState('Countdown');

  const onStartRest = () => setState('Rest');

  const onStop = () => setState('Stopped');

  return (
    <ConfigContext.Provider value={defaultConfig}>
      <div class="content">
        <h3 class="state-info">{formatState(state)}</h3>
        <TimeBlock
          state={state}
          onStartWork={onStartWork}
          onStartCountdown={onStartCountdown}
          onStartRest={onStartRest}
          onStop={onStop}
        />
      </div>
    </ConfigContext.Provider>
  );
};

export default App;
