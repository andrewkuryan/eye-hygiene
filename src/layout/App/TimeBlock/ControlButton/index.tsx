import { FunctionComponent } from 'preact';
import { memo, useState } from 'preact/compat';

import { State } from '@/logic/App/State';

import './control-button.styl';

interface ControlButtonProps {
  state: State;
  onStart: () => void;
  onStop: () => void;
}

const ControlButton: FunctionComponent<ControlButtonProps> = memo(({ state, onStart, onStop }) => {
  const [iconState, setIconState] = useState<'play' | 'stop' | null>(null);

  const handleClick = () => {
    if (state === 'Stopped') {
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
});

export default ControlButton;
