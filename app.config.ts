import { ExpoConfig, ConfigContext } from "expo/config";
import { withAndroidManifest } from "expo/config-plugins";
import appJson from "./app.json";

function withGoogleMapsApiKey(config: ExpoConfig, apiKey: string) {
  return withAndroidManifest(config, (mod) => {
    const mainApp = mod.modResults.manifest.application?.[0];
    if (!mainApp) return mod;

    mainApp["meta-data"] = mainApp["meta-data"] ?? [];
    mainApp["meta-data"].push({
      $: {
        "android:name": "com.google.android.geo.API_KEY",
        "android:value": apiKey,
      },
    });

    return mod;
  });
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const baseConfig = appJson.expo as ExpoConfig;
  const googleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  const googleServicesFile =
    process.env.GOOGLE_SERVICES_JSON ?? baseConfig.android?.googleServicesFile ?? "./google-services.json";

  let finalConfig: ExpoConfig = {
    ...baseConfig,
    android: {
      ...baseConfig.android,
      googleServicesFile,
    },
    updates: {
      enabled: true,
      checkAutomatically: "ON_LOAD",
      fallbackToCacheTimeout: 5000,
      url: `https://u.expo.dev/${baseConfig.extra?.eas?.projectId}`,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  };

  if (googleMapsApiKey) {
    finalConfig = withGoogleMapsApiKey(finalConfig, googleMapsApiKey);
  }

  return finalConfig;
};
