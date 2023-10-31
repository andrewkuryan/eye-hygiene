import { FunctionComponent } from 'preact';

import { State } from '@/logic/App/State';
import useScheduler from '@/logic/App/TimeBlock/useScheduler';
import usePeriodDuration from '@/logic/App/TimeBlock/usePeriodDuration';
import ProgressBar from './ProgressBar';
import ControlButton from './ControlButton';
import Timer from './Timer';

import './time-block.styl';

interface TimeBlockProps {
  state: State;
  onStartWork: () => void;
  onStartCountdown: () => void;
  onStartRest: () => void;
  onStop: () => void;
}

const TimeBlock: FunctionComponent<TimeBlockProps> = ({
  state,
  onStartWork,
  onStartCountdown,
  onStartRest,
  onStop,
}) => {
  const seconds = useScheduler(state, onStartWork, onStartCountdown, onStartRest);
  const periodDuration = usePeriodDuration(state);

  console.log('TimeBlock: ', seconds);

  return (
    <div class="time-block-root">
      <ProgressBar progress={periodDuration > 0 ? seconds / periodDuration : 1} />
      <div class="control-block">
        <ControlButton state={state} onStart={onStartWork} onStop={onStop} />
        <Timer restTime={periodDuration - seconds} />
      </div>
    </div>
  );
};

export default TimeBlock;
