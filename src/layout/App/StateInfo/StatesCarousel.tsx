import { FunctionComponent } from 'preact';
import { useMemo } from 'preact/compat';

import { TimerState } from '@/logic/App/TimerState';
import useScreenDimensions from '@/layout/hooks/useScreenDimensions';
import useStateViews from './hooks/useStateViews';
import Carousel from './Carousel';
import StateTitle from './StateTitle';

import './states-carousel.styl';

interface StatesCarouselProps {
  timerState: TimerState;
  onStartNextPeriod: () => void;
}

const StatesCarousel: FunctionComponent<StatesCarouselProps> = ({
  timerState,
  onStartNextPeriod,
}) => {
  const { isTablet } = useScreenDimensions();

  const states = useStateViews(timerState, isTablet);

  const onSkipPeriod = useMemo(
    () => (timerState.type !== 'Stopped' ? onStartNextPeriod : undefined),
    [timerState],
  );

  return (
    <Carousel
      className="states-carousel-root"
      isTablet={isTablet}
      Slide={StateTitle}
      slideParams={states}
      onNextArrowClick={onSkipPeriod}
    />
  );
};

export default StatesCarousel;
