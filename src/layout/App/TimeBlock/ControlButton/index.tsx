import { FunctionComponent } from 'preact';
import { memo, useState } from 'preact/compat';

import { TimerState } from '@/logic/App/TimerState';

import './control-button.styl';

interface ControlButtonProps {
  timerState: TimerState;
  onStart: () => void;
  onStop: () => void;
}

const ControlButton: FunctionComponent<ControlButtonProps> = memo(
  ({ timerState, onStart, onStop }) => {
    const [iconState, setIconState] = useState<'play' | 'stop' | null>(null);

    const handleClick = () => {
      if (timerState.type === 'Stopped') {
        onStart();
        setIconState('stop');
      } else {
        onStop();
        setIconState('play');
      }
    };

    return (
      <button class="control-button" onClick={handleClick}>
        <span class={`icon ${iconState ? iconState : ''}`} />
      </button>
    );
  },
);

export default ControlButton;
