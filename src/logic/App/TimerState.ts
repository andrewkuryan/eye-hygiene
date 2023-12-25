import { useContext, useState } from 'preact/compat';

import { Config, ConfigContext } from '@/logic/Config';
import { ServiceContext, SoundObject } from '@/service';

export type TimerState = { type: 'Stopped' } | { type: 'Running'; index: number };

export function getStateTitle(state: TimerState | null, config: Config) {
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

export function getNextRunningState(
  currentState: TimerState | null,
  config: Config,
  step?: number,
): TimerState {
  const currentIndex = currentState?.type === 'Running' ? currentState.index : -1;

  return { type: 'Running', index: (currentIndex + (step ?? 1)) % config.periods.length };
}

const useTimerState = () => {
  const config = useContext(ConfigContext);
  const { notification, staticService, sound } = useContext(ServiceContext);
  const [state, setState] = useState<TimerState>({ type: 'Stopped' });
  const [sounds, setSounds] = useState<Array<SoundObject | null>>(config.periods.map(() => null));

  const onStartPeriod = (periodIndex: number) => {
    setState({ type: 'Running', index: periodIndex });

    sound
      .initContext()
      .then(() => notification.requestPermission())
      .then(hasPermission => {
        if (hasPermission) {
          return Promise.resolve();
        } else {
          throw new Error('No notifications permission');
        }
      })
      .then(async () => {
        const existingSound = sounds[periodIndex];
        if (existingSound !== null) {
          return existingSound;
        } else {
          const soundObject = await sound.loadFile(
            staticService.resolve('sounds', config.periods[periodIndex].sound),
          );
          setSounds(sounds.map((sound, index) => (index === periodIndex ? soundObject : sound)));
          return soundObject;
        }
      })
      .then(soundObject =>
        notification
          .showNotification(
            config.periods[periodIndex].title,
            staticService.resolve('icons', 'icon-192x192.png'),
          )
          .then(() => sound.play(soundObject)),
      )
      .catch(err => console.log(err));
  };

  const onStartNextPeriod = () =>
    onStartPeriod(state.type === 'Stopped' ? 0 : (state.index + 1) % config.periods.length);

  const onStop = () => setState({ type: 'Stopped' });

  return { state, onStartNextPeriod, onStop };
};

export default useTimerState;
