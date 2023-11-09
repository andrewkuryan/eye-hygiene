import { useContext, useEffect, useMemo, useState } from 'preact/compat';

import Const from '@/logic/Const';
import { ConfigContext } from '@/logic/Config';
import { TimerState } from '@/logic/App/TimerState';
import { ServiceContext } from '@/service';
import { OutMessageType, postInMessage, WORKER_NAME } from '@/workers/ScheduleWorker';

function useWorker(state: TimerState, onStartPeriod: (periodIndex: number) => void) {
  const config = useContext(ConfigContext);
  const { staticService } = useContext(ServiceContext);

  const [seconds, setSeconds] = useState(0);

  const worker = useMemo(
    () => new Worker(staticService.resolve(Const.WORKERS_DIR, WORKER_NAME).url),
    [],
  );

  useEffect(() => {
    worker.onmessage = (e: MessageEvent<OutMessageType>) => {
      switch (e.data.type) {
        case 'NEXT_SECOND':
          setSeconds(e.data.seconds);

          break;
        case 'NEXT_PERIOD':
          setSeconds(0);
          onStartPeriod(e.data.periodIndex);

          break;
        case 'STOP':
          setSeconds(0);

          break;
      }
    };
  }, [onStartPeriod]);

  useEffect(() => {
    if (state.type === 'Stopped') {
      postInMessage(worker, { type: 'STOP' });
    } else {
      postInMessage(worker, {
        type: 'START',
        periodDurations: config.periods.map(period => period.duration),
      });
    }
  }, [state]);

  return seconds;
}

export default useWorker;
