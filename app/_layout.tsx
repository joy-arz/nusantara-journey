import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { UpdateBanner } from "@/components/UpdateBanner";
import { useAppUpdate } from "@/hooks/useAppUpdate";
import { queryClient } from "@/lib/query-client";
import { CartProvider } from "@/context/CartContext";
import { GameProvider } from "@/context/GameContext";
import { AuthProvider } from "@/context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import { startBackgroundLocation } from "@/lib/background-location";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="product/[id]" options={{ headerShown: false, presentation: "card" }} />
    </Stack>
  );
}

async function requestAllPermissions() {
  if (Platform.OS === "web") return;

  await Promise.allSettled([
    ImagePicker.requestCameraPermissionsAsync(),
    ImagePicker.requestMediaLibraryPermissionsAsync(),
    Audio.requestPermissionsAsync(),
  ]);
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const { status, downloadAndApply, applyUpdate } = useAppUpdate();

  useEffect(() => {
    requestAllPermissions();
    startBackgroundLocation().catch(console.warn);
  }, []);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <GameProvider>
          <AuthProvider>
            <CartProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <KeyboardProvider>
                  <View style={{ flex: 1 }}>
                    <RootLayoutNav />
                    <UpdateBanner
                      status={status}
                      onDownload={downloadAndApply}
                      onApply={applyUpdate}
                    />
                  </View>
                </KeyboardProvider>
              </GestureHandlerRootView>
            </CartProvider>
          </AuthProvider>
        </GameProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
