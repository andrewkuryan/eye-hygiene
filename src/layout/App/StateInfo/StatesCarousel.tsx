import { FunctionComponent, h } from 'preact';
import { nanoid } from 'nanoid/non-secure';

import Carousel, { useScreenDimensions } from './Carousel';
import { TimerState } from '@/logic/App/TimerState';
import { Config, ConfigContext } from '@/logic/Config';
import { useContext, useEffect, useLayoutEffect, useState } from 'preact/compat';
import StateTitle from '@/layout/App/StateInfo/StateTitle';

function getStateTitle(state: TimerState | null, config: Config) {
  if (!state) {
    return null;
  }

  switch (state.type) {
    case 'Stopped':
      return config.notStartedTitle;
    case 'Running':
      return config.periods[state.index].title;
  }
}

class StateView {
  private constructor(
    readonly state: TimerState | null,
    readonly title: string | null,
    readonly displayPosition: number,
    readonly key: string,
    readonly inactive: boolean,
  ) {}

  private static generateKey = (title: string | null) => `${title ?? 'null'}-${nanoid(6)}`;

  static build = (state: TimerState | null, displayPosition: number, config: Config) => {
    const title = getStateTitle(state, config);
    return new StateView(state, title, displayPosition, StateView.generateKey(title), false);
  };

  static empty = (displayPosition: number) =>
    new StateView(null, null, displayPosition, StateView.generateKey(null), false);

  copy = (newDisplayPosition: number, inactive?: boolean) => {
    return new StateView(this.state, this.title, newDisplayPosition, this.key, inactive ?? false);
  };
}

function getNextRunningState(
  currentState: TimerState | null,
  config: Config,
  step?: number,
): TimerState {
  const currentIndex = currentState?.type === 'Running' ? currentState.index : -1;

  return { type: 'Running', index: (currentIndex + (step ?? 1)) % config.periods.length };
}

function buildNewStates({
  isTablet,
  config,
  ...params
}: ({ states: Array<StateView>; stateIndex: number } | { timerState: TimerState }) & {
  isTablet: boolean;
  config: Config;
}): Array<StateView> {
  if ('states' in params) {
    const { states, stateIndex } = params;

    const nextState = getNextRunningState(states[stateIndex].state, config);

    if (isTablet) {
      return [
        states[stateIndex - 1]?.copy(0) ?? StateView.empty(0),
        states[stateIndex].copy(1),
        states[stateIndex + 1] && !states[stateIndex + 1].inactive
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
        states[stateIndex + 1] && !states[stateIndex + 1].inactive
          ? states[stateIndex + 1].copy(3)
          : StateView.build(nextState, 3, config),
        states[stateIndex + 2] && !states[stateIndex + 2].inactive
          ? states[stateIndex + 2].copy(4)
          : StateView.build(overNextState, 4, config),
        ...states
          .slice(stateIndex + 3)
          .filter(state => state.displayPosition < 4)
          .map(state => state.copy(4)),
      ];
    }
  } else {
    const { timerState } = params;

    if (isTablet) {
      return [
        StateView.empty(0),
        StateView.build(timerState, 1, config),
        StateView.build(getNextRunningState(timerState, config), 2, config),
      ];
    } else {
      return [
        StateView.empty(0),
        StateView.empty(1),
        StateView.build(timerState, 2, config),
        StateView.build(getNextRunningState(timerState, config), 3, config),
        StateView.build(getNextRunningState(timerState, config, 2), 4, config),
      ];
    }
  }
}

const buildInitialStates = (isTablet: boolean, config: Config) =>
  buildNewStates({ timerState: { type: 'Stopped' }, isTablet, config });

interface StatesCarouselProps {
  timerState: TimerState;
}

const StatesCarousel: FunctionComponent<StatesCarouselProps> = ({ timerState }) => {
  const config = useContext(ConfigContext);
  const { isTablet, width, height } = useScreenDimensions();

  const [states, setStates] = useState(buildInitialStates(isTablet, config));

  useEffect(() => {
    const stateIndex = states
      .map(state => state.title)
      .lastIndexOf(getStateTitle(timerState, config), isTablet ? 2 : 4);

    if (timerState.type === 'Running') {
      if (stateIndex >= 0) {
        setStates(buildNewStates({ states, stateIndex, isTablet, config }));
      }
    } else {
      if (stateIndex >= 0) {
        setStates(buildNewStates({ states, stateIndex, isTablet, config }));
      } else {
        const initialStates = buildInitialStates(isTablet, config);
        setStates([...initialStates.map(state => state.copy(0, true)), ...states]);
        requestAnimationFrame(() => {
          setStates([...initialStates, ...states.map(state => state.copy(isTablet ? 2 : 4, true))]);
        });
      }
    }
  }, [timerState]);

  useLayoutEffect(() => {
    const activeStates = states.filter(state => !state.inactive);

    if (isTablet && activeStates.length === 5) {
      setStates(
        activeStates
          .slice(1, activeStates.length - 1)
          .map(state => state.copy(state.displayPosition - 1)),
      );
    }
    if (!isTablet && activeStates.length === 3) {
      setStates([
        StateView.empty(0),
        ...activeStates.map(state => state.copy(state.displayPosition + 1)),
        StateView.build(
          getNextRunningState(activeStates[activeStates.length - 1].state, config),
          4,
          config,
        ),
      ]);
    }
  }, [width, height]);

  return (
    <Carousel
      isTablet={isTablet}
      width={width}
      height={height}
      Slide={StateTitle}
      slideParams={states}
    />
  );
};

export default StatesCarousel;
