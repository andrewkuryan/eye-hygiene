import { createContext } from 'preact/compat';

export interface PeriodConfig {
  duration: number;
  title: string;
  sound: string;
}

export interface Config {
  notStartedTitle: string;
  periods: Array<PeriodConfig>;
}

export const defaultConfig: Config = {
  notStartedTitle: 'Not started',
  periods: [
    {
      duration: 15 * 60,
      title: 'Time to work',
      sound: 'complete.mp3',
    },
    {
      duration: 10,
      title: 'Preparation for rest',
      sound: 'gentle-gong.mp3',
    },
    {
      duration: 20,
      title: 'Rest time',
      sound: 'pending.mp3',
    },
  ],
};

export const ConfigContext = createContext<Config>(defaultConfig);
