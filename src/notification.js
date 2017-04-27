import { Alert, AsyncStorage } from 'react-native';
import { NotificationsAndroid, PendingNotifications } from 'react-native-notifications';

const regTokenNotification = () => {
  NotificationsAndroid.setRegistrationTokenUpdateListener((deviceToken) => {
    AsyncStorage.setItem('notificationToken', deviceToken);
  });
};

const eventNotification = (navigation) => {
  PendingNotifications.getInitialNotification()
    .then((notification) => {
      if (notification && notification.data && notification.data.click_action.indexOf('NOTIFICATIONS') > -1) {
        navigation.navigate('Notifications');
      } else if (notification && notification.data && notification.data.click_action.indexOf('LIBRARY') > -1) {
        navigation.navigate('LibraryUpdated');
      }
    });

  NotificationsAndroid.setNotificationOpenedListener((notification) => {
    if (notification && notification.data && notification.data.click_action.indexOf('NOTIFICATIONS') > -1) {
      navigation.navigate('Notifications');
    } else if (notification && notification.data && notification.data.click_action.indexOf('LIBRARY') > -1) {
      navigation.navigate('LibraryUpdated');
    }
  });
};

export { eventNotification, regTokenNotification };
