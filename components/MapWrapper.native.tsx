import React from "react";
import MapView, { Marker, Circle, Callout } from "react-native-maps";

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

export function NusantaraMapView(props: MapViewProps) {
  return <MapView {...props as any} />;
}

export function NusantaraMarker(props: MarkerProps) {
  return <Marker {...props as any} />;
}

export function NusantaraCircle(props: CircleProps) {
  return <Circle {...props as any} />;
}

export function NusantaraCallout({ children }: { children?: React.ReactNode }) {
  return <Callout>{children}</Callout>;
}
