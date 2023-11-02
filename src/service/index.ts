import { createContext } from 'preact/compat';

import NotificationService from './NotificationService';
import StaticService, { StaticObject } from './StaticService';
import SoundService, { SoundObject } from './SoundService';

export interface Service {
  notification: NotificationService;
  staticService: StaticService;
  sound: SoundService;
}

export const defaultService = {
  notification: new NotificationService(),
  staticService: new StaticService(),
  sound: new SoundService(),
};

export const ServiceContext = createContext<Service>(defaultService);

export { StaticObject, SoundObject };
