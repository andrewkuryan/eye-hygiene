import { createContext } from 'preact/compat';

import NotificationService from './NotificationService';
import StaticService, { StaticObject } from './StaticService';
import SoundService, { SoundObject } from './SoundService';
import TrayService from './TrayService';

export interface Service {
  notification: NotificationService;
  staticService: StaticService;
  sound: SoundService;
  tray: TrayService;
}

export const defaultService = {
  notification: new NotificationService(),
  staticService: new StaticService(),
  sound: new SoundService(),
  tray: new TrayService(),
};

export const ServiceContext = createContext<Service>(defaultService);

export { StaticObject, SoundObject };
