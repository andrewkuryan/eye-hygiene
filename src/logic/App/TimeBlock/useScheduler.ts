import { useEffect, useState } from 'preact/compat';

import { State } from '@/logic/App/State';
import usePeriodDuration from './usePeriodDuration';

function useOnStartNextPeriod(
  state: State,
  onStartWork: () => void,
  onStartCountdown: () => void,
  onStartRest: () => void,
) {
  switch (state) {
    case 'Work':
      return onStartCountdown;
    case 'Countdown':
      return onStartRest;
    case 'Rest':
      return onStartWork;
    case 'Stopped':
      return () => {};
  }
}

function useScheduler(
  state: State,
  onStartWork: () => void,
  onStartCountdown: () => void,
  onStartRest: () => void,
) {
  const [seconds, setSeconds] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const periodDuration = usePeriodDuration(state);
  const onStartNextPeriod = useOnStartNextPeriod(state, onStartWork, onStartCountdown, onStartRest);

  useEffect(() => {
    let timeoutId: number | undefined = undefined;

    if (state !== 'Stopped') {
      if (!startTime) {
        setStartTime(Date.now());
      }
      timeoutId = window.setTimeout(
        () => {
          if (seconds === periodDuration) {
            onStartNextPeriod();
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
