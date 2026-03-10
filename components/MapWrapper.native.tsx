import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import MapView, { Marker, Circle, Callout } from "react-native-maps";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

const GOOGLE_MAPS_CONFIGURED =
  Platform.OS !== "android" || !!process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

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

function MapFallback({ style }: { style?: object }) {
  return (
    <View style={[styles.fallback, style]}>
      <Ionicons name="map-outline" size={48} color={Colors.textMuted} />
      <Text style={styles.fallbackTitle}>Map Unavailable</Text>
      <Text style={styles.fallbackText}>
        Set EXPO_PUBLIC_GOOGLE_MAPS_API_KEY in your environment and rebuild to
        enable the map.
      </Text>
    </View>
  );
}

class MapErrorBoundary extends Component<
  { children: React.ReactNode; style?: object },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <MapFallback style={this.props.style} />;
    return this.props.children;
  }
}

export function NusantaraMapView(props: MapViewProps) {
  if (!GOOGLE_MAPS_CONFIGURED) return <MapFallback style={props.style} />;
  return (
    <MapErrorBoundary style={props.style}>
      <MapView {...(props as any)} />
    </MapErrorBoundary>
  );
}

export function NusantaraMarker(props: MarkerProps) {
  if (!GOOGLE_MAPS_CONFIGURED) return null;
  return <Marker {...(props as any)} />;
}

export function NusantaraCircle(props: CircleProps) {
  if (!GOOGLE_MAPS_CONFIGURED) return null;
  return <Circle {...(props as any)} />;
}

export function NusantaraCallout({
  children,
  tooltip,
}: {
  children?: React.ReactNode;
  tooltip?: boolean;
}) {
  if (!GOOGLE_MAPS_CONFIGURED) return null;
  return <Callout tooltip={tooltip}>{children}</Callout>;
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundSecondary,
    gap: 10,
    padding: 24,
  },
  fallbackTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
  },
  fallbackText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    lineHeight: 18,
    maxWidth: 260,
  },
});
