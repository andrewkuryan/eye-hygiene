import { useCallback, useContext, useEffect } from 'preact/compat';

import { ServiceContext } from '@/service';
import { TimerState } from '@/logic/App/TimerState';
import { ConfigContext } from '@/logic/Config';

function useTrayControls(onStartPeriod: (periodIndex: number) => void, onStop: () => void) {
  const { tray } = useContext(ServiceContext);

  const onTrayPlay = useCallback(() => {
    onStartPeriod(0);
  }, [onStartPeriod]);

  useEffect(() => {
    tray.setOnPlayHandler(onTrayPlay);
    tray.setOnPauseHandler(onStop);
    tray.setOnStopHandler(onStop);
  }, [onTrayPlay, onStop]);
}

function useTray(
  state: TimerState,
  seconds: number,
  onStartPeriod: (periodIndex: number) => void,
  onStop: () => void,
) {
  const config = useContext(ConfigContext);
  const { staticService, tray } = useContext(ServiceContext);

  useTrayControls(onStartPeriod, onStop);

  useEffect(() => {
    tray.setMetadata({
      artwork: [
        {
          src: staticService.resolve('icons', 'icon.svg').url,
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
