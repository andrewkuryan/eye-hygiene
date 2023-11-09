export const WORKER_NAME = 'scheduleWorker.js';

export type InMessageType = { type: 'START'; periodDurations: Array<number> } | { type: 'STOP' };

export function postInMessage(worker: Worker, message: InMessageType) {
  return worker.postMessage(message);
}

export type OutMessageType =
  | { type: 'NEXT_SECOND'; seconds: number }
  | { type: 'NEXT_PERIOD'; periodIndex: number }
  | { type: 'STOP' };

export function postOutMessage(message: OutMessageType) {
  return postMessage(message);
}
