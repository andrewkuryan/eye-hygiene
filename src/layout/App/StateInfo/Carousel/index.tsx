import { FunctionComponent, RenderableProps } from 'preact';
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'preact/compat';

import './carousel.styl';

interface ScreenDimensions {
  width: number;
  height: number;
  isTablet: boolean;
}

export function useScreenDimensions(): ScreenDimensions {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const isTablet = window.innerWidth <= 768;

  useEffect(() => {
    const listener = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, []);

  return { width, height, isTablet };
}

interface SlideProps {
  displayPosition: number;
  key: string;
}

export interface SlideSetup {
  className: string;
  width: number;
  height: number;
  left: number;
  align: 'left' | 'center' | 'right';
  scale: number;
  applyTextEllipsis: boolean;
}

type CarouselProps<P extends SlideProps> = {
  Slide: FunctionComponent<Omit<P, 'displayPosition' | 'key'> & SlideSetup>;
  slideParams: Array<P>;
} & ScreenDimensions;

function getSlideAlign(index: number, isTiny: boolean) {
  switch (index) {
    case 0:
      return 'left';
    case 1:
      return isTiny ? 'center' : 'left';
    case 2:
      return isTiny ? 'right' : 'center';
    case 3:
      return 'right';
    case 4:
      return 'right';
    default:
      return 'left';
  }
}

function getSlideScale(index: number, isTiny: boolean) {
  switch (index) {
    case 0:
      return 0;
    case 1:
      return isTiny ? 1 : 0.4;
    case 2:
      return isTiny ? 0 : 1;
    case 3:
      return 0.4;
    case 4:
      return 0;
    default:
      return 0;
  }
}

function applySlideTextEllipsis(index: number, isTiny: boolean) {
  return (!isTiny && index !== 2) || (isTiny && index !== 1);
}

function getSlideClassName(index: number, isTiny: boolean) {
  switch (index) {
    case 0:
      return 'hidden-left';
    case 1:
      return isTiny ? 'active' : 'previous';
    case 2:
      return isTiny ? 'hidden-right' : 'active';
    case 3:
      return 'next';
    case 4:
      return 'hidden-right';
    default:
      return 'hidden-left';
  }
}

function Carousel<P extends SlideProps>({
  Slide,
  slideParams,
  width,
  height,
  isTablet,
}: RenderableProps<CarouselProps<P>>) {
  const [sizes, setSizes] = useState({
    width: 0,
    height: 0,
    init: false,
    cellOffsets: isTablet ? [0, 0, 0] : [0, 0, 0, 0, 0],
  });

  const hiddenLeftPlaceholder = useRef<HTMLDivElement>(null);
  const previousPlaceholder = useRef<HTMLDivElement>(null);
  const activePlaceholder = useRef<HTMLDivElement>(null);
  const nextPlaceholder = useRef<HTMLDivElement>(null);
  const hiddenRightPlaceholder = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      hiddenLeftPlaceholder.current &&
      activePlaceholder.current &&
      hiddenRightPlaceholder.current
    ) {
      const hiddenLeftLeft = hiddenLeftPlaceholder.current.getBoundingClientRect().left;
      const previousLeft = previousPlaceholder.current?.getBoundingClientRect()?.left;
      const { left: activeLeft, width, height } = activePlaceholder.current.getBoundingClientRect();
      const nextLeft = nextPlaceholder.current?.getBoundingClientRect()?.left;
      const hiddenRightLeft = hiddenRightPlaceholder.current.getBoundingClientRect().left;

      setSizes({
        width,
        height,
        init: true,
        cellOffsets: [
          hiddenLeftLeft,
          ...(previousLeft ? [previousLeft] : []),
          activeLeft,
          ...(nextLeft ? [nextLeft] : []),
          hiddenRightLeft,
        ],
      });
    }
  }, [width, height]);

  return (
    <div class={`carousel-root ${isTablet ? 'tiny' : ''}`}>
      <div ref={hiddenLeftPlaceholder} class="placeholder" />
      {!isTablet && <div ref={previousPlaceholder} class="placeholder" />}
      <div ref={activePlaceholder} class="placeholder" />
      {!isTablet && <div ref={nextPlaceholder} class="placeholder" />}
      <div ref={hiddenRightPlaceholder} class="placeholder" />
      {sizes.init &&
        slideParams.map(({ displayPosition, key, ...props }) => (
          <Slide
            {...props}
            key={key}
            width={sizes.width}
            height={sizes.height}
            left={sizes.cellOffsets[displayPosition]}
            align={getSlideAlign(displayPosition, isTablet)}
            scale={getSlideScale(displayPosition, isTablet)}
            applyTextEllipsis={applySlideTextEllipsis(displayPosition, isTablet)}
            className={getSlideClassName(displayPosition, isTablet)}
          />
        ))}
    </div>
  );
}

export default memo(Carousel);
