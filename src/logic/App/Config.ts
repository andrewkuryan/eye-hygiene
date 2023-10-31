import { createContext } from 'preact/compat';

export interface Config {
  workPeriod: number;
  countdownPeriod: number;
  restPeriod: number;
}

export const defaultConfig: Config = {
  workPeriod: 15 * 60,
  countdownPeriod: 10,
  restPeriod: 20,
};

export const ConfigContext = createContext<Config>(defaultConfig);
