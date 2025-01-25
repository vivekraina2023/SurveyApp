import analytics from '@react-native-firebase/analytics';

export const logEvent = (eventName, params) => {
  analytics().logEvent(eventName, params);
}; 