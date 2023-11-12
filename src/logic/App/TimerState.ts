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
            staticService.resolve('icons', 'icon.svg'),
          )
          .then(() => sound.play(soundObject)),
      )
      .catch(err => console.log(err));
  };

  const onStop = () => setState({ type: 'Stopped' });

  return { state, onStartPeriod, onStop };
};

export default useTimerState;
