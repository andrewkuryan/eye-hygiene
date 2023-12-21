import { nanoid } from 'nanoid/non-secure';

import { TimerState, getStateTitle, getNextRunningState } from '@/logic/App/TimerState';
import { Config } from '@/logic/Config';

class StateView {
  private constructor(
    readonly state: TimerState | null,
    readonly title: string | null,
    readonly displayPosition: number,
    readonly key: string,
    readonly disabled: boolean,
  ) {}

  private static generateKey = (title: string | null) => `${title ?? 'null'}-${nanoid(6)}`;

  static build = (state: TimerState | null, displayPosition: number, config: Config) => {
    const title = getStateTitle(state, config);
    return new StateView(state, title, displayPosition, StateView.generateKey(title), false);
  };

  static empty = (displayPosition: number) =>
    new StateView(null, null, displayPosition, StateView.generateKey(null), false);

  copy = (newDisplayPosition: number, inactive?: boolean) => {
    return new StateView(
      this.state,
      this.title,
      newDisplayPosition,
      this.key,
      inactive ?? this.disabled,
    );
  };
}

export function buildNewStates(
  states: Array<StateView>,
  stateIndex: number,
  isTablet: boolean,
  config: Config,
): Array<StateView> {
  const nextState = getNextRunningState(states[stateIndex].state, config);

  if (isTablet) {
    return [
      states[stateIndex - 1]?.copy(0) ?? StateView.empty(0),
      states[stateIndex].copy(1),
      states[stateIndex + 1] && !states[stateIndex + 1].disabled
        ? states[stateIndex + 1].copy(2)
        : StateView.build(nextState, 2, config),
      ...states
        .slice(stateIndex + 2)
        .filter(state => state.displayPosition < 2)
        .map(state => state.copy(2)),
    ];
  } else {
    const overNextState = getNextRunningState(nextState, config);

    return [
      states[stateIndex - 2]?.copy(0) ?? StateView.empty(0),
      states[stateIndex - 1]?.copy(1) ?? StateView.empty(1),
      states[stateIndex].copy(2),
      states[stateIndex + 1] && !states[stateIndex + 1].disabled
        ? states[stateIndex + 1].copy(3)
        : StateView.build(nextState, 3, config),
      states[stateIndex + 2] && !states[stateIndex + 2].disabled
        ? states[stateIndex + 2].copy(4)
        : StateView.build(overNextState, 4, config),
      ...states
        .slice(stateIndex + 3)
        .filter(state => state.displayPosition < 4)
        .map(state => state.copy(4)),
    ];
  }
}

export function buildInitialStates(isTablet: boolean, config: Config) {
  const activeState: TimerState = { type: 'Stopped' };

  if (isTablet) {
    return [
      StateView.empty(0),
      StateView.build(activeState, 1, config),
      StateView.build(getNextRunningState(activeState, config), 2, config),
    ];
  } else {
    return [
      StateView.empty(0),
      StateView.empty(1),
      StateView.build(activeState, 2, config),
      StateView.build(getNextRunningState(activeState, config), 3, config),
      StateView.build(getNextRunningState(activeState, config, 2), 4, config),
    ];
  }
}
