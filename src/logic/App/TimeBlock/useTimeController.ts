import { useContext, useEffect, useRef } from 'preact/compat';

import { ServiceContext } from '@/service';
import { TimerState } from '@/logic/App/TimerState';
import useWorker from './useWorker';
import useTray from './useTray';

function useAudioProps(state: TimerState) {
  const { staticService } = useContext(ServiceContext);

  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (state.type === 'Stopped') {
      ref.current?.pause();
    } else {
      ref.current?.play();
    }
  }, [state]);

  return {
    ref,
    loop: true,
    src: staticService.resolve('sounds', 'placeholder.mp3').url,
  };
}

function useTimeController(
  state: TimerState,
  onStartPeriod: (periodIndex: number) => void,
  onStop: () => void,
) {
  const audioProps = useAudioProps(state);
  const seconds = useWorker(state, onStartPeriod);
  useTray(state, seconds, onStartPeriod, onStop);

  return { seconds, audioProps };
}

export default useTimeController;
