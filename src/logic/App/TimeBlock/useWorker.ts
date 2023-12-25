import { useContext, useEffect, useMemo, useState } from 'preact/compat';

import Const from '@/logic/Const';
import { ConfigContext } from '@/logic/Config';
import { TimerState } from '@/logic/App/TimerState';
import { ServiceContext } from '@/service';
import { OutMessageType, postInMessage, WORKER_NAME } from '@/workers/ScheduleWorker';

function useWorker(state: TimerState, onStartNextPeriod: () => void) {
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
        case 'SET_SECONDS':
          setSeconds(e.data.value);

          break;
        case 'NEXT_PERIOD':
          onStartNextPeriod();

          break;
      }
    };
  }, [onStartNextPeriod]);

  useEffect(() => {
    if (state.type === 'Stopped') {
      postInMessage(worker, { type: 'STOP' });
    } else {
      postInMessage(worker, {
        type: 'START',
        periodDurations: config.periods.map(period => period.duration),
        periodIndex: state.index,
      });
    }
  }, [state]);

  return seconds;
}

export default useWorker;
