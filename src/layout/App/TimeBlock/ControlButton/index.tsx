import { FunctionComponent } from 'preact';
import { memo, useEffect, useState } from 'preact/compat';

import { TimerState } from '@/logic/App/TimerState';

import './control-button.styl';

interface ControlButtonProps {
  timerState: TimerState;
  onStartPeriod: (index: number) => void;
  onStop: () => void;
}

const ControlButton: FunctionComponent<ControlButtonProps> = memo(
  ({ timerState, onStartPeriod, onStop }) => {
    const [iconState, setIconState] = useState<'play' | 'stop' | null>(null);

    const handleIconStateChange = () => {
      if (timerState.type === 'Stopped') {
        if (iconState !== null) {
          setIconState('play');
        }
      } else {
        setIconState('stop');
      }
    };

    useEffect(() => handleIconStateChange(), [timerState]);

    const handleClick = () => {
      if (timerState.type === 'Stopped') {
        onStartPeriod(0);
      } else {
        onStop();
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
