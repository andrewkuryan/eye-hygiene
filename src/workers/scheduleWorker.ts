import { InMessageType, postOutMessage } from './ports/ScheduleWorker';

let timeoutId: ReturnType<typeof setTimeout> | undefined;

function handleStart(periodDurations: Array<number>) {
  let seconds = 0;
  let startTime = Date.now();
  let periodIndex = 0;

  function startNextTimeout() {
    if (seconds === periodDurations[periodIndex] - 1) {
      seconds = 0;
      startTime = Date.now();
      periodIndex = (periodIndex + 1) % periodDurations.length;
      timeoutId = setTimeout(startNextTimeout, 1000);
      postOutMessage({ type: 'NEXT_PERIOD', periodIndex });
    } else {
      seconds = seconds + 1;
      timeoutId = setTimeout(startNextTimeout, 1000 - (Date.now() - startTime - seconds * 1000));
      postOutMessage({ type: 'NEXT_SECOND', seconds });
    }
  }

  timeoutId = setTimeout(startNextTimeout, 1000);
}

function handleStop() {
  clearTimeout(timeoutId);
  timeoutId = undefined;
  postOutMessage({ type: 'STOP' });
}

onmessage = (e: MessageEvent<InMessageType>) => {
  switch (e.data.type) {
    case 'START':
      if (!timeoutId) {
        return handleStart(e.data.periodDurations);
      } else {
        return undefined;
      }
    case 'STOP':
      return handleStop();
  }
};
