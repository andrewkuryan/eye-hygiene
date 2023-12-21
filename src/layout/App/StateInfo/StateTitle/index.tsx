import { FunctionComponent } from 'preact';
import { memo, Ref, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'preact/compat';

import { SlideSetup } from '@/layout/App/StateInfo/Carousel';

import './state-title.styl';

interface StateTitleProps extends SlideSetup {
  title: string | null;
}

const StateTitle: FunctionComponent<StateTitleProps> = memo(
  ({ title, align, className, hidden }) => {
    const words = title?.split(' ') ?? [];

    const rootRef = useRef<HTMLDivElement>(null);

    const [hasOverflowY, setHasOverflowY] = useState(false);

    const wordRefs = useMemo<Array<Ref<HTMLSpanElement>>>(
      () => Array.from(Array(words.length)).map(() => ({ current: null })),
      [title],
    );

    const alignText = () => {
      if (rootRef.current && !hidden) {
        const rows: { [top: number]: Array<HTMLSpanElement> } = {};
        for (let wordRef of wordRefs) {
          if (wordRef.current) {
            rows[wordRef.current.offsetTop] = [
              ...(rows[wordRef.current.offsetTop] ?? []),
              wordRef.current,
            ];
          }
        }
        for (let row of Object.values(rows)) {
          let translate = 0;
          let padding = parseInt(
            getComputedStyle(rootRef.current).getPropertyValue('padding-left'),
          );
          if (align === 'left') {
            translate = -row[0].offsetLeft + padding;
          } else if (align === 'right') {
            translate = row[0].offsetLeft - padding;
          }
          for (let item of row) {
            if (item.scrollWidth > rootRef.current.clientWidth - 2 * Math.abs(padding)) {
              item.style.transform = `translateX(0px)`;
              item.classList.add('overflowed-x');
            } else {
              item.style.transform = `translateX(${translate}px)`;
              item.classList.remove('overflowed-x');
            }
          }
        }
        if (Object.entries(rows).length > 0) {
          const [lastTop, lastItems] = Object.entries(rows).reduce((current, value) =>
            Number(current[0]) > Number(value[0]) ? current : value,
          );
          setHasOverflowY(
            align !== 'center' &&
              Number(lastTop) + lastItems[0].offsetHeight > rootRef.current.offsetHeight + 1,
          );
        }
      }
    };

    useLayoutEffect(() => {
      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(() => {
          alignText();
        });
      });

      document.fonts.ready.then(() => {
        if (rootRef.current) {
          resizeObserver.observe(rootRef.current);
        }
      });
      return () => {
        if (rootRef.current) {
          resizeObserver.unobserve(rootRef.current);
        }
      };
    });

    useEffect(() => {
      return () => {
        rootRef.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      };
    }, [align]);

    return (
      <div
        ref={rootRef}
        class={`state-title-root ${align} ${hasOverflowY ? 'overflowed-y' : ''} ${className}`}
      >
        {words.map((word, index) => (
          <span ref={wordRefs[index]}>{word}</span>
        ))}
      </div>
    );
  },
);

export default StateTitle;
