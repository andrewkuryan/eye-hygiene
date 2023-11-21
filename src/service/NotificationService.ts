import { StaticObject } from './StaticService';

class NotificationService {
  private hasPermission: boolean | null = null;

  requestPermission = async () => {
    if (this.hasPermission === null) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        this.hasPermission = permission === 'granted';
      } else {
        this.hasPermission = false;
      }
    }
    return this.hasPermission;
  };

  showNotification = async (title: string, icon: StaticObject) => {
    return navigator.serviceWorker.getRegistrations().then(
      registrations =>
        registrations?.[0]?.showNotification(title, {
          icon: icon.url,
          silent: true,
        }),
    );
  };
}

export default NotificationService;
