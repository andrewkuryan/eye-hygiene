import { FunctionComponent } from 'preact';
import { memo, Ref, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'preact/compat';
import { SlideSetup } from '@/layout/App/StateInfo/Carousel';

import './state-title.styl';

interface StateTitleProps extends SlideSetup {
  title: string | null;
}

const lineHeightMultiplier = 0.09375;
const wordGapMultiplier = 0.25;

interface WordLayout {
  transform: string;
  opacity: number;
  className?: string;
  transition?: string;
}

function getHorizontalMargin(
  align: 'left' | 'center' | 'right',
  containerWidth: number,
  elemsWidth: number,
) {
  switch (align) {
    case 'left':
      return 0;
    case 'center':
      return (containerWidth - elemsWidth) / 2;
    case 'right':
      return containerWidth - elemsWidth;
  }
}

function getTranslateXCorrection(
  align: 'left' | 'center' | 'right',
  scale: number,
  elemWidth: number,
) {
  switch (align) {
    case 'left':
      return -(elemWidth - elemWidth * scale) / 2;
    case 'center':
      return 0;
    case 'right':
      return -(elemWidth - elemWidth * scale) / 2;
  }
}

function getTranslateYCorrection(scale: number, elemHeight: number) {
  const preScaledHeight = scale !== 0 ? elemHeight / scale : 0;
  const scaledHeight = elemHeight * scale;
  return -(preScaledHeight - scaledHeight) / 2 + (elemHeight - scaledHeight) / 2;
}

const StateTitle: FunctionComponent<StateTitleProps> = memo(
  ({ className, title, width, height, left, align, scale, applyTextEllipsis }) => {
    const words = title?.split(' ') ?? [];

    const rootRef = useRef<HTMLDivElement>(null);

    const [wordLayouts, setWordLayouts] = useState<Array<WordLayout | null>>(
      Array.from(Array(words.length)).map(() => null),
    );
    const [widthOverflow, setWidthOverflow] = useState(0);
    const [applyTransitions, setApplyTransitions] = useState(false);

    const wordRef = useMemo<Array<Ref<HTMLSpanElement>>>(
      () => Array.from(Array(words.length)).map(() => ({ current: null })),
      [title],
    );

    const rootHeight = scale !== 0 ? height / scale : 0;

    useLayoutEffect(() => {
      let rootWidth = width;
      const elemHeight = wordRef[0]?.current?.offsetHeight ?? 0;
      const lineHeight = elemHeight + elemHeight * lineHeightMultiplier;
      const wordGap = elemHeight * wordGapMultiplier;

      let currentXPos = 0;
      let currentYPos = 0;

      let rows: { width: number; left: number; top: number }[][] = [[]];
      let rowIndex = 0;

      function newLine() {
        currentYPos += lineHeight;
        currentXPos = 0;
        rowIndex += 1;
        rows = [...rows, []];
      }

      for (let i = 0; i < wordRef.length; i++) {
        const elem = wordRef[i].current;
        const obj = { width: 0, left: 0, top: 0 };
        if (elem) {
          if (currentXPos > 0 && currentXPos + elem.scrollWidth >= width) {
            newLine();
          }

          if (elem.scrollWidth + 2 >= rootWidth && !applyTextEllipsis) {
            rootWidth = elem.scrollWidth + 2;
          }

          obj.left = currentXPos;
          obj.top = currentYPos;
          obj.width = applyTextEllipsis ? Math.min(elem.scrollWidth, rootWidth) : elem.scrollWidth;
          currentXPos += elem.scrollWidth;
          if (i < wordRef.length - 1) {
            currentXPos += wordGap;
          }
          rows[rowIndex] = [...rows[rowIndex], obj];
        }
      }

      const verticalMargin =
        (rootHeight - (applyTextEllipsis ? Math.min(3, rows.length) : rows.length) * lineHeight) /
        2;
      for (let i = 0; i < rows.length; i++) {
        const horizontalMargin = getHorizontalMargin(
          align,
          rootWidth,
          rows[i].reduce(
            (acc, item, index) => acc + item.width + (index < rows[i].length - 1 ? wordGap : 0),
            0,
          ),
        );
        for (let j = 0; j < rows[i].length; j++) {
          rows[i][j].top = rows[i][j].top + Math.max(verticalMargin, 0);
          rows[i][j].left = rows[i][j].left + horizontalMargin;
        }
      }

      let newWordLayouts: Array<WordLayout> = [];
      for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
          const isLastVisible =
            applyTextEllipsis && i === 2 && j === rows[i].length - 1 && rows.length > 3;
          newWordLayouts = [
            ...newWordLayouts,
            {
              opacity: applyTextEllipsis && i >= 3 ? 0 : isLastVisible ? 0.5 : 1,
              transform: `translateX(${rows[i][j].left}px) translateY(${rows[i][j].top}px)`,
              ...(isLastVisible ? { className: 'last' } : {}),
            },
          ];
        }
      }

      setWordLayouts(newWordLayouts);
      setWidthOverflow(rootWidth - width);

      return () => {
        if (!applyTextEllipsis && rootRef.current) {
          rootRef.current.scrollTo(0, 0);
        }
      };
    }, [title, width, height, left, align, scale, applyTextEllipsis]);

    useEffect(() => {
      if (wordLayouts.length > 0 && wordLayouts[0] !== null && !applyTransitions) {
        setApplyTransitions(true);
      }
    }, [wordLayouts]);

    const translateX = left + getTranslateXCorrection(align, scale, width) - widthOverflow / 2;
    const translateY = getTranslateYCorrection(scale, height);

    return (
      <div
        ref={rootRef}
        class={`state-title-root ${className}`}
        style={{
          width: width + widthOverflow,
          height: rootHeight,
          transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
          ...(applyTransitions
            ? {
                transition:
                  'width 1s ease-in-out, height 1s ease-in-out, opacity 1s ease-in-out, transform 1s ease-in-out',
              }
            : {}),
        }}
      >
        {words.map((word, index) => {
          const { className, ...style } = wordLayouts[index] ?? {};
          return (
            <span
              ref={wordRef[index]}
              class={className}
              style={{
                ...style,
                ...(applyTransitions
                  ? {
                      transition: 'transform 1s ease-in-out, opacity 1s ease-in-out',
                    }
                  : {}),
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    );
  },
);

export default StateTitle;
