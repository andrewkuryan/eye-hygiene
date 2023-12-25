export const WORKER_NAME = 'scheduleWorker.js';

export type InMessageType =
  | { type: 'START'; periodDurations: Array<number>; periodIndex: number }
  | { type: 'STOP' };

export function postInMessage(worker: Worker, message: InMessageType) {
  return worker.postMessage(message);
}

export type OutMessageType = { type: 'SET_SECONDS'; value: number } | { type: 'NEXT_PERIOD' };

export function postOutMessage(message: OutMessageType) {
  return postMessage(message);
}
