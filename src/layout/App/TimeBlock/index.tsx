import { FunctionComponent } from 'preact';

import { TimerState } from '@/logic/App/TimerState';
import usePeriodDuration from '@/logic/App/TimeBlock/usePeriodDuration';
import useTimeController from '@/logic/App/TimeBlock/useTimeController';
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
  const { seconds, audioProps } = useTimeController(timerState, onStartPeriod, onStop);
  const periodDuration = usePeriodDuration(timerState);

  return (
    <div class="time-block-root">
      <audio {...audioProps} />
      <ProgressBar progress={periodDuration > 0 ? seconds / (periodDuration - 1) : 1} />
      <div class="control-block">
        <ControlButton timerState={timerState} onStartPeriod={onStartPeriod} onStop={onStop} />
        <Timer restTime={periodDuration - seconds} />
      </div>
    </div>
  );
};

export default TimeBlock;
