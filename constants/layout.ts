import { Platform } from "react-native";

export const TAB_BAR_HEIGHT = 84; // 50px tab bar + 34px bottom inset
export const WEB_TOP_INSET = 67;
export const WEB_BOTTOM_INSET = 34;

export const getTabSafePadding = (insetsBottom: number) => {
  if (Platform.OS === "web") {
    return TAB_BAR_HEIGHT + WEB_BOTTOM_INSET;
  }
  return TAB_BAR_HEIGHT + insetsBottom;
};
