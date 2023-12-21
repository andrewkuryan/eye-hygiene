import { FunctionComponent } from 'preact';

interface ArrowProps {
  className?: string;
}

const Arrow: FunctionComponent<ArrowProps> = ({ className }) => {
  return (
    <svg {...(className ? { class: className } : {})}>
      <line x1="100%" y1="0%" x2="0%" y2="50%" stroke-width="3" stroke-linecap="round" />
      <line x1="0" y1="50%" x2="100%" y2="100%" stroke-width="3" stroke-linecap="round" />
    </svg>
  );
};

export default Arrow;
