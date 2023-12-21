import { FunctionComponent } from 'preact';

import { TimerState } from '@/logic/App/TimerState';
import useScreenDimensions from '@/layout/hooks/useScreenDimensions';
import useStateViews from './hooks/useStateViews';
import Carousel from './Carousel';
import StateTitle from './StateTitle';

import './states-carousel.styl';

interface StatesCarouselProps {
  timerState: TimerState;
}

const StatesCarousel: FunctionComponent<StatesCarouselProps> = ({ timerState }) => {
  const { isTablet } = useScreenDimensions();

  const states = useStateViews(timerState, isTablet);

  return (
    <Carousel
      className="states-carousel-root"
      isTablet={isTablet}
      Slide={StateTitle}
      slideParams={states}
    />
  );
};

export default StatesCarousel;
