import { FunctionComponent } from 'preact';
import { memo } from 'preact/compat';

import { TimerState } from '@/logic/App/TimerState';

import './control-button.styl';

interface ControlButtonProps {
  timerState: TimerState;
  onStartPeriod: (index: number) => void;
  onStop: () => void;
}

const ControlButton: FunctionComponent<ControlButtonProps> = memo(
  ({ timerState, onStartPeriod, onStop }) => {
    const handleClick = () => {
      if (timerState.type === 'Stopped') {
        onStartPeriod(0);
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
