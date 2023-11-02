import { useContext, useState } from 'preact/compat';

import { ConfigContext } from '@/logic/Config';
import { ServiceContext, SoundObject } from '@/service';

export type TimerState = { type: 'Stopped' } | { type: 'Running'; index: number };

const useTimerState = () => {
  const config = useContext(ConfigContext);
  const { notification, staticService, sound } = useContext(ServiceContext);
  const [state, setState] = useState<TimerState>({ type: 'Stopped' });
  const [sounds, setSounds] = useState<Array<SoundObject | null>>(config.periods.map(() => null));

  const onStartPeriod = (periodIndex: number) => {
    let requestPromise;
    if (state.type === 'Stopped') {
      requestPromise = notification.requestPermission();
    } else {
      requestPromise = Promise.resolve();
    }

    setState({ type: 'Running', index: periodIndex });
    requestPromise
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
          .showNotification(config.periods[periodIndex].title)
          .addEventListener('show', () => sound.play(soundObject)),
      );
  };

  const onStop = () => setState({ type: 'Stopped' });

  return { state, onStartPeriod, onStop };
};

export default useTimerState;
