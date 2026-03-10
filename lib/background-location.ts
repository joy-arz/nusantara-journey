import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import {
  HERITAGE_SITES,
  MUSEUMS,
  UMKM_ARTISANS,
  FOOD_STANDS,
  Place,
} from "@/constants/places-data";

const TASK_NAME = "nusantara-background-location";
const NOTIFIED_KEY = "nusantara_notified_places";
const LOCATION_KEY = "nusantara_last_location";

const PROXIMITY_RADIUS_KM = 0.5;
const COOLDOWN_HOURS = 24;

const R = 6371;
function toRad(v: number) {
  return (v * Math.PI) / 180;
}
function distanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const ALL_PLACES: Place[] = [
  ...HERITAGE_SITES,
  ...MUSEUMS,
  ...UMKM_ARTISANS,
  ...FOOD_STANDS,
];

const TYPE_LABELS: Record<Place["type"], string> = {
  heritage: "Heritage Site",
  museum: "Museum",
  umkm: "UMKM Artisan",
  food: "Traditional Food",
};

async function getNotifiedMap(): Promise<Record<string, number>> {
  try {
    const raw = await AsyncStorage.getItem(NOTIFIED_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function markNotified(placeId: string) {
  const map = await getNotifiedMap();
  map[placeId] = Date.now();
  await AsyncStorage.setItem(NOTIFIED_KEY, JSON.stringify(map));
}

TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
  if (error) return;
  const { locations } = data as { locations: Location.LocationObject[] };
  if (!locations?.length) return;

  const { latitude, longitude } = locations[0].coords;

  await AsyncStorage.setItem(
    LOCATION_KEY,
    JSON.stringify({ latitude, longitude, timestamp: Date.now() })
  );

  const notified = await getNotifiedMap();
  const now = Date.now();

  for (const place of ALL_PLACES) {
    const dist = distanceKm(latitude, longitude, place.lat, place.lng);
    if (dist > PROXIMITY_RADIUS_KM) continue;

    const lastNotified = notified[place.id];
    if (lastNotified && now - lastNotified < COOLDOWN_HOURS * 3600 * 1000)
      continue;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `📍 ${TYPE_LABELS[place.type]} Nearby!`,
        body: `You're near ${place.name} — ${place.description.slice(0, 80)}…`,
        data: { placeId: place.id },
      },
      trigger: null,
    });

    await markNotified(place.id);
  }
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function startBackgroundLocation(): Promise<boolean> {
  if (Platform.OS === "web") return false;

  const { status: fg } = await Location.requestForegroundPermissionsAsync();
  if (fg !== "granted") return false;

  const { status: bg } = await Location.requestBackgroundPermissionsAsync();
  if (bg !== "granted") return false;

  const { status: notif } = await Notifications.requestPermissionsAsync();
  if (notif !== "granted") {
    console.warn("Notification permission denied — proximity alerts disabled");
  }

  const isRunning = await Location.hasStartedLocationUpdatesAsync(TASK_NAME);
  if (isRunning) return true;

  await Location.startLocationUpdatesAsync(TASK_NAME, {
    accuracy: Location.Accuracy.High,
    distanceInterval: 100,
    deferredUpdatesInterval: 60_000,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: "Nusantara Journey",
      notificationBody: "Exploring cultural heritage near you",
      notificationColor: "#C4622D",
    },
  });

  return true;
}

export async function stopBackgroundLocation() {
  if (Platform.OS === "web") return;
  const isRunning = await Location.hasStartedLocationUpdatesAsync(TASK_NAME);
  if (isRunning) {
    await Location.stopLocationUpdatesAsync(TASK_NAME);
  }
}

export async function isBackgroundLocationRunning(): Promise<boolean> {
  if (Platform.OS === "web") return false;
  return Location.hasStartedLocationUpdatesAsync(TASK_NAME);
}
