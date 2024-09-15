import Constants from "expo-constants";
import { Platform } from "react-native";

function getLocalIP() {
  if (Platform.OS === 'web') {
    return "localhost";
  }
  try {
    return Constants.experienceUrl.split("//")[1].split(":")[0];
  } catch (error) {
    // Your computers's local ip if we can't detect it
    // so that your expo app connects to the local server
    return "192.168.1.65";
  }
}

export const ip = getLocalIP();
