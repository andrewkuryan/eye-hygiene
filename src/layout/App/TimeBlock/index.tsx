import { FunctionComponent } from 'preact';

import { TimerState } from '@/logic/App/TimerState';
import useScheduler from '@/logic/App/TimeBlock/useScheduler';
import usePeriodDuration from '@/logic/App/TimeBlock/usePeriodDuration';
import ProgressBar from './ProgressBar';
import ControlButton from './ControlButton';
import Timer from './Timer';

import './time-block.styl';

interface TimeBlockProps {
  timerState: TimerState;
  onStartPeriod: (periodIndex: number) => void;
  onStop: () => void;
}

const TimeBlock: FunctionComponent<TimeBlockProps> = ({ timerState, onStartPeriod, onStop }) => {
  const seconds = useScheduler(timerState, onStartPeriod);
  const periodDuration = usePeriodDuration(timerState);

  return (
    <div class="time-block-root">
      <ProgressBar progress={periodDuration > 0 ? seconds / periodDuration : 1} />
      <div class="control-block">
        <ControlButton timerState={timerState} onStart={() => onStartPeriod(0)} onStop={onStop} />
        <Timer restTime={periodDuration - seconds} />
      </div>
    </div>
  );
};

export default TimeBlock;
