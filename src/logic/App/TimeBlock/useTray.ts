import { useContext, useEffect } from 'preact/compat';

import { ServiceContext } from '@/service';
import { TimerState } from '@/logic/App/TimerState';
import { ConfigContext } from '@/logic/Config';

function useTrayControls(onStartNextPeriod: () => void, onStop: () => void) {
  const { tray } = useContext(ServiceContext);

  useEffect(() => {
    tray.setOnPlayHandler(onStartNextPeriod);
    tray.setOnPauseHandler(onStop);
    tray.setOnStopHandler(onStop);
    tray.setOnNextHandler(onStartNextPeriod);
  }, [onStartNextPeriod, onStop]);
}

function useTray(
  state: TimerState,
  seconds: number,
  onStartNextPeriod: () => void,
  onStop: () => void,
) {
  const config = useContext(ConfigContext);
  const { staticService, tray } = useContext(ServiceContext);

  useTrayControls(onStartNextPeriod, onStop);

  useEffect(() => {
    tray.setMetadata({
      artwork: [
        {
          src: staticService.resolve('icons', 'icon-96x96.png').url,
          sizes: '96x96',
          type: 'image/svg',
        },
        {
          src: staticService.resolve('icons', 'icon-144x144.png').url,
          sizes: '144x144',
          type: 'image/svg',
        },
        {
          src: staticService.resolve('icons', 'icon-192x192.png').url,
          sizes: '192x192',
          type: 'image/svg',
        },
        {
          src: staticService.resolve('icons', 'icon-384x384.png').url,
          sizes: '384x384',
          type: 'image/svg',
        },
        {
          src: staticService.resolve('icons', 'icon-512x512.png').url,
          sizes: '512x512',
          type: 'image/svg',
        },
      ],
    });
  }, []);

  useEffect(() => {
    tray.setPositionState({ position: seconds });
  }, [seconds]);

  useEffect(() => {
    if (state.type === 'Stopped') {
      tray.setPositionState({ duration: 0, position: 0 });
      tray.setPlaybackState('paused');
      tray.setMetadata({ artist: config.notStartedTitle });
    } else {
      tray.setMetadata({ artist: config.periods[state.index].title });
      tray.setPositionState({ duration: config.periods[state.index].duration, position: 0 });
      tray.setPlaybackState('playing');
    }
  }, [state]);
}

export default useTray;
