import React from "react";
import { Button } from "react-native";
import * as Notifications from "expo-notifications";
import { schedulePushNotification } from "@library/utils/handleLocalNotification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const LocalNotification = () => {
  const handleLocalPushNotification = async () => {
    await schedulePushNotification();
  };

  return (
    <Button title="Send Notification" onPress={handleLocalPushNotification} />
  );
};

export default LocalNotification;
