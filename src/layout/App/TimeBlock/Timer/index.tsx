import { FunctionComponent } from 'preact';

import './timer.styl';

interface TimerProps {
  restTime: number;
}

function formatTime(value: number) {
  const minutes = Math.floor(value / 60);
  const restSeconds = value - minutes * 60;
  return `${minutes.toString().padStart(2, '0')}:${restSeconds.toString().padStart(2, '0')}`;
}

const Timer: FunctionComponent<TimerProps> = ({ restTime }) => {
  console.log('Timer');

  const formattedTime = formatTime(restTime);

  return (
    <p class="timer-root">
      {Array.from(formattedTime).map(c => (
        <span>{c}</span>
      ))}
    </p>
  );
};

export default Timer;
