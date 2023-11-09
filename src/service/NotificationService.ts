import { StaticObject } from './StaticService';

class NotificationService {
  requestPermission = async () => {
    if (!window.Notification) {
      return false;
    } else {
      return Notification.requestPermission().then(result => result === 'granted');
    }
  };

  showNotification = (title: string, icon: StaticObject): Notification => {
    return new Notification(title, {
      icon: icon.url,
      silent: true,
    });
  };
}

export default NotificationService;
