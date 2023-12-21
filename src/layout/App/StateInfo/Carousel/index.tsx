import { FunctionComponent, RenderableProps } from 'preact';
import { memo } from 'preact/compat';

import { ScreenDimensions } from '@/layout/hooks/useScreenDimensions';
import Arrow from './Arrow';

import './carousel.styl';

interface SlideProps {
  displayPosition: number;
  key: string;
}

type SlideAlign = 'left' | 'center' | 'right';

export interface SlideSetup {
  align: SlideAlign;
  hidden: boolean;
  className?: string;
}

type CarouselProps<P extends SlideProps> = {
  Slide: FunctionComponent<Omit<P, 'displayPosition' | 'key'> & SlideSetup>;
  slideParams: Array<P>;
  className?: string;
} & ScreenDimensions;

function getSlideParam<T>(
  slideParams: Array<T>,
  tinySlideParams: Array<T>,
  displayPosition: number,
  isTiny: boolean,
) {
  const params = isTiny ? tinySlideParams : slideParams;
  return displayPosition < 0
    ? params[0]
    : displayPosition >= params.length
    ? params[params.length - 1]
    : params[displayPosition];
}

const tinySlideAligns: Array<SlideAlign> = ['left', 'center', 'right'];
const slideAligns: Array<SlideAlign> = ['left', 'left', 'center', 'right', 'right'];

const getSlideAlign = (displayPosition: number, isTiny: boolean) =>
  getSlideParam(slideAligns, tinySlideAligns, displayPosition, isTiny);

const tinySlideClassNames = ['hidden-left', 'active', 'hidden-right'];
const slideClassNames = ['hidden-left', 'previous', 'active', 'next', 'hidden-right'];

const getSlideClassName = (displayPosition: number, isTiny: boolean) =>
  getSlideParam(slideClassNames, tinySlideClassNames, displayPosition, isTiny);

function Carousel<P extends SlideProps>({
  Slide,
  slideParams,
  isTablet,
  className,
}: RenderableProps<CarouselProps<P>>) {
  return (
    <div class={`carousel-root ${className ? className : ''}`}>
      <Arrow className="arrow left" />
      <div class="carousel-content">
        {slideParams.map(({ displayPosition, key, ...props }) => (
          <Slide
            key={key}
            className={`slide ${getSlideClassName(displayPosition, isTablet)}`}
            align={getSlideAlign(displayPosition, isTablet)}
            hidden={displayPosition === 0 || displayPosition === (isTablet ? 2 : 4)}
            {...props}
          />
        ))}
      </div>
      <Arrow className="arrow right" />
    </div>
  );
}

export default memo(Carousel);
