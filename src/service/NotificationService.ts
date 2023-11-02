class NotificationService {
  requestPermission = async () => {
    if (!window.Notification) {
      return false;
    } else {
      return Notification.requestPermission().then(result => result === 'granted');
    }
  };

  showNotification = (text: string): Notification => {
    return new Notification(text);
  };
}

export default NotificationService;
