import { useContext, useEffect, useState } from 'preact/compat';

import { ConfigContext } from '@/logic/Config';
import { getStateTitle, TimerState } from '@/logic/App/TimerState';
import { buildInitialStates, buildNewStates } from './StateView';

function useStateViews(timerState: TimerState, isTablet: boolean) {
  const config = useContext(ConfigContext);

  const [states, setStates] = useState(buildInitialStates(isTablet, config));

  useEffect(() => {
    const stateIndex = states
      .map(state => state.title)
      .lastIndexOf(getStateTitle(timerState, config), isTablet ? 2 : 4);

    if (stateIndex !== (isTablet ? 1 : 2)) {
      if (timerState.type === 'Running') {
        if (stateIndex >= 0) {
          setStates(buildNewStates(states, stateIndex, isTablet, config));
        }
      } else {
        if (stateIndex >= 0) {
          setStates(buildNewStates(states, stateIndex, isTablet, config));
        } else {
          const initialStates = buildInitialStates(isTablet, config);
          setStates([...initialStates.map(state => state.copy(0, true)), ...states]);
          requestAnimationFrame(() => {
            setStates([
              ...initialStates,
              ...states.map(state => state.copy(isTablet ? 2 : 4, true)),
            ]);
          });
        }
      }
    }
  }, [timerState, isTablet, config]);

  return states;
}

export default useStateViews;
