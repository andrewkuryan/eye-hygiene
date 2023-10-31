import { FunctionComponent } from 'preact';

import './progress-bar.styl';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({ progress }) => {
  return (
    <div class="progress-bar-root">
      <span style={{ width: `${(1 - progress) * 100}%` }} class="indicator" />
    </div>
  );
};

export default ProgressBar;
