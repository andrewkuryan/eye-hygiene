import { useEffect, useState } from 'preact/compat';

export interface ScreenDimensions {
  isTablet: boolean;
}

function useScreenDimensions(): ScreenDimensions {
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const listener = () => {
      setIsTablet(window.innerWidth <= 768);
    };

    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, []);

  return { isTablet };
}

export default useScreenDimensions;
