import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface MarkerProps {
  coordinate: Coordinate;
  onPress?: () => void;
  children?: React.ReactNode;
  [key: string]: unknown;
}

interface CircleProps {
  center: Coordinate;
  radius: number;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  [key: string]: unknown;
}

interface MapViewProps {
  style?: object;
  initialRegion?: Region;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export function NusantaraMapView({ style, children }: MapViewProps) {
  return (
    <View style={[styles.webMapFallback, style]}>
      <Text style={styles.webMapIcon}>🗺️</Text>
      <Text style={styles.webMapTitle}>Live Map — Expo Go Only</Text>
      <Text style={styles.webMapSub}>Open in Expo Go on your device to explore the interactive heritage map with GPS markers</Text>
    </View>
  );
}

export function NusantaraMarker({ children }: MarkerProps) {
  return null;
}

export function NusantaraCircle(_props: CircleProps) {
  return null;
}

export function NusantaraCallout({ children }: { children?: React.ReactNode; tooltip?: boolean }) {
  return null;
}

const styles = StyleSheet.create({
  webMapFallback: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 12,
  },
  webMapIcon: { fontSize: 48 },
  webMapTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
    textAlign: "center",
  },
  webMapSub: {
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 18,
    maxWidth: 280,
  },
});
