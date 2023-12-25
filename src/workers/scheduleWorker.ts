import { InMessageType, postOutMessage } from './ports/ScheduleWorker';

let timeoutId: ReturnType<typeof setTimeout> | undefined;

const state = {
  _seconds: 0,
  set seconds(value: number) {
    if (this._seconds !== value) {
      this._seconds = value;
      postOutMessage({ type: 'SET_SECONDS', value });
    }
  },
  get seconds() {
    return this._seconds;
  },
};

function handleStart(periodDurations: Array<number>, periodIndex: number) {
  let startTime = Date.now();

  function startNextTimeout() {
    if (state.seconds === periodDurations[periodIndex] - 1) {
      postOutMessage({ type: 'NEXT_PERIOD' });
    } else {
      state.seconds = state.seconds + 1;
      timeoutId = setTimeout(
        startNextTimeout,
        1000 - (Date.now() - startTime - state.seconds * 1000),
      );
    }
  }

  timeoutId = setTimeout(startNextTimeout, 1000);
}

function handleStop() {
  clearTimeout(timeoutId);
  state.seconds = 0;
}

onmessage = (e: MessageEvent<InMessageType>) => {
  switch (e.data.type) {
    case 'START':
      handleStop();
      return handleStart(e.data.periodDurations, e.data.periodIndex);
    case 'STOP':
      return handleStop();
  }
};
