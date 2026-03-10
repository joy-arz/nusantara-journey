import { useCallback, useEffect, useState } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import * as Updates from "expo-updates";

export type UpdateStatus =
  | "idle"
  | "checking"
  | "available"
  | "downloading"
  | "ready"
  | "error"
  | "up-to-date";

const CHECK_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

export function useAppUpdate() {
  const [status, setStatus] = useState<UpdateStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const checkForUpdate = useCallback(async () => {
    if (__DEV__ || Platform.OS === "web") return;

    try {
      setStatus("checking");
      setError(null);
      const result = await Updates.checkForUpdateAsync();

      if (result.isAvailable) {
        setStatus("available");
      } else {
        setStatus("up-to-date");
      }
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Failed to check for updates");
    }
  }, []);

  const downloadAndApply = useCallback(async () => {
    if (__DEV__ || Platform.OS === "web") return;

    try {
      setStatus("downloading");
      setError(null);
      await Updates.fetchUpdateAsync();
      setStatus("ready");
    } catch (e) {
      setStatus("error");
      setError(
        e instanceof Error ? e.message : "Failed to download update",
      );
    }
  }, []);

  const applyUpdate = useCallback(async () => {
    await Updates.reloadAsync();
  }, []);

  useEffect(() => {
    if (__DEV__ || Platform.OS === "web") return;

    checkForUpdate();

    const interval = setInterval(checkForUpdate, CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [checkForUpdate]);

  useEffect(() => {
    if (__DEV__ || Platform.OS === "web") return;

    const handleAppState = (nextState: AppStateStatus) => {
      if (nextState === "active") {
        checkForUpdate();
      }
    };

    const sub = AppState.addEventListener("change", handleAppState);
    return () => sub.remove();
  }, [checkForUpdate]);

  return {
    status,
    error,
    checkForUpdate,
    downloadAndApply,
    applyUpdate,
  };
}
