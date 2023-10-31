import { useContext } from 'preact/compat';

import { State } from '@/logic/App/State';
import { ConfigContext } from '@/logic/App/Config';

function usePeriodDuration(state: State) {
  const config = useContext(ConfigContext);

  switch (state) {
    case 'Work':
      return config.workPeriod;
    case 'Countdown':
      return config.countdownPeriod;
    case 'Rest':
      return config.restPeriod;
    case 'Stopped':
      return 0;
  }
}

export default usePeriodDuration;
