import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { UpdateStatus } from "@/hooks/useAppUpdate";

interface UpdateBannerProps {
  status: UpdateStatus;
  onDownload: () => void;
  onApply: () => void;
}

export function UpdateBanner({ status, onDownload, onApply }: UpdateBannerProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-120)).current;

  const visible = status === "available" || status === "downloading" || status === "ready";

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: visible ? 0 : -120,
      useNativeDriver: true,
      damping: 18,
      stiffness: 200,
    }).start();
  }, [visible, translateY]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { paddingTop: insets.top + 8, transform: [{ translateY }] },
      ]}
    >
      <View style={styles.content}>
        {status === "available" && (
          <>
            <Text style={styles.text}>A new update is available</Text>
            <Pressable style={styles.button} onPress={onDownload}>
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
          </>
        )}
        {status === "downloading" && (
          <>
            <ActivityIndicator size="small" color="#FFF" />
            <Text style={styles.text}>Downloading update…</Text>
          </>
        )}
        {status === "ready" && (
          <>
            <Text style={styles.text}>Update ready!</Text>
            <Pressable style={styles.button} onPress={onApply}>
              <Text style={styles.buttonText}>Restart</Text>
            </Pressable>
          </>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: "#1A6B3C",
    paddingBottom: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  text: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
  button: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
});
