import { useContext, useEffect, useState } from 'preact/compat';

import { TimerState } from '@/logic/App/TimerState';
import { ConfigContext } from '@/logic/Config';
import usePeriodDuration from './usePeriodDuration';

function useScheduler(state: TimerState, onStartPeriod: (periodIndex: number) => void) {
  const config = useContext(ConfigContext);
  const [seconds, setSeconds] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const periodDuration = usePeriodDuration(state);

  useEffect(() => {
    let timeoutId: number | undefined = undefined;

    if (state.type !== 'Stopped') {
      if (!startTime) {
        setStartTime(Date.now());
      }
      timeoutId = window.setTimeout(
        () => {
          if (seconds === periodDuration) {
            onStartPeriod((state.index + 1) % config.periods.length);
            setSeconds(0);
            setStartTime(null);
          } else {
            setSeconds(seconds + 1);
          }
        },
        startTime ? 1000 - (Date.now() - startTime - seconds * 1000) : 1000,
      );
    } else {
      setSeconds(0);
      setStartTime(null);
    }
    return () => window.clearTimeout(timeoutId);
  });

  return seconds;
}

export default useScheduler;
