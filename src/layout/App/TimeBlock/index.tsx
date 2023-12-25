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
  onStartNextPeriod: () => void;
  onStop: () => void;
}

function useTimeView(timerState: TimerState, seconds: number) {
  const periodDuration = usePeriodDuration(timerState);

  return {
    progress: periodDuration > 0 ? seconds / (periodDuration - 1) : 1,
    restTime: periodDuration > 0 ? periodDuration - seconds : 0,
  };
}

const TimeBlock: FunctionComponent<TimeBlockProps> = ({
  timerState,
  onStartNextPeriod,
  onStop,
}) => {
  const { seconds, audioProps } = useTimeController(timerState, onStartNextPeriod, onStop);
  const { progress, restTime } = useTimeView(timerState, seconds);

  return (
    <div class="time-block-root">
      <audio {...audioProps} />
      <ProgressBar progress={progress} />
      <div class="control-block">
        <ControlButton
          timerState={timerState}
          onStartNextPeriod={onStartNextPeriod}
          onStop={onStop}
        />
        <Timer restTime={restTime} />
      </div>
    </div>
  );
};

export default TimeBlock;
