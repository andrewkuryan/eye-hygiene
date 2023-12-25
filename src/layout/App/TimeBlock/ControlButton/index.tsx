import { FunctionComponent } from 'preact';
import { memo } from 'preact/compat';

import { TimerState } from '@/logic/App/TimerState';

import './control-button.styl';

interface ControlButtonProps {
  timerState: TimerState;
  onStartNextPeriod: () => void;
  onStop: () => void;
}

const ControlButton: FunctionComponent<ControlButtonProps> = memo(
  ({ timerState, onStartNextPeriod, onStop }) => {
    const handleClick = () => {
      if (timerState.type === 'Stopped') {
        onStartNextPeriod();
      } else {
        onStop();
      }
    };

    return (
      <button class="control-button" onClick={handleClick}>
        <span class={`icon ${timerState.type === 'Stopped' ? 'play' : 'stop'}`} />
      </button>
    );
  },
);

export default ControlButton;
