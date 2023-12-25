import { FunctionComponent } from 'preact';

import './arrow.styl';

interface ArrowProps {
  className?: string;
  onClick?: () => void;
}

const Arrow: FunctionComponent<ArrowProps> = ({ className, onClick }) => {
  const isDisabled = !onClick;

  return (
    <button
      disabled={isDisabled}
      class={`arrow-root ${className ? className : ''}`}
      onClick={onClick}
    >
      <svg>
        <line x1="100%" y1="0%" x2="0%" y2="50%" stroke-width="3" stroke-linecap="round" />
        <line x1="0" y1="50%" x2="100%" y2="100%" stroke-width="3" stroke-linecap="round" />
      </svg>
    </button>
  );
};

export default Arrow;
