import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// const TWO_WEEKS = 60 * 60 * 24 * 14;

export const schedulePushNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Your opinion is important to us!",
      subtitle: "It's been a while since you used the app.",
      body: "Please take a moment to leave a review.",
      categoryIdentifier: "testAction",
    },
    trigger: {
      seconds: 10,
    },
  });
};

export const registerForPushNotificationsAsync = async () => {
  let token = "";

  const complete = {
    buttonTitle: "Complete",
    identifier: "complete",
  };

  const dismiss = {
    buttonTitle: "Dismiss",
    identifier: "dismiss",
  };

  if (Platform.OS === "android") {
    await Notifications.setNotificationCategoryAsync("testAction", [
      complete,
      dismiss,
    ]);

    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FFAABBCC",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  // eslint-disable-next-line consistent-return
  return token;
};
