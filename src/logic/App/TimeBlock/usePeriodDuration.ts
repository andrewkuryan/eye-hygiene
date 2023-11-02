import { useContext } from 'preact/compat';

import { TimerState } from '@/logic/App/TimerState';
import { ConfigContext } from '@/logic/Config';

function usePeriodDuration(state: TimerState) {
  const config = useContext(ConfigContext);

  switch (state.type) {
    case 'Running':
      return config.periods[state.index].duration;
    case 'Stopped':
      return 0;
  }
}

export default usePeriodDuration;
