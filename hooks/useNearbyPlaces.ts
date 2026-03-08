import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { 
  KINGDOM_CENTROIDS, 
  MUSEUMS, 
  UMKM_ARTISANS, 
  HERITAGE_SITES, 
  Place, 
  KingdomCentroid 
} from '../constants/places-data';

export interface NearbyPlacesState {
  kingdom: KingdomCentroid | null;
  nearbyHeritageSites: Place[];
  nearbyMuseums: Place[];
  nearbyUMKM: Place[];
  userCoords: { latitude: number; longitude: number } | null;
  regionName: string | null;
  isLoading: boolean;
  permissionDenied: boolean;
  isOutsideIndonesia: boolean;
}

const R = 6371; // Earth's radius in km

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function useNearbyPlaces() {
  const [state, setState] = useState<NearbyPlacesState>({
    kingdom: null,
    nearbyHeritageSites: [],
    nearbyMuseums: [],
    nearbyUMKM: [],
    userCoords: null,
    regionName: null,
    isLoading: true,
    permissionDenied: false,
    isOutsideIndonesia: false,
  });

  useEffect(() => {
    async function getNearbyData() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setState(prev => ({ ...prev, isLoading: false, permissionDenied: true }));
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const { latitude, longitude } = location.coords;

        // Check if outside Indonesia (rough bounding box)
        const isOutside = latitude < -11 || latitude > 6 || longitude < 95 || longitude > 141;

        // Find nearest kingdom centroid
        let nearestKingdom = null;
        let minKingdomDist = Infinity;
        for (const k of KINGDOM_CENTROIDS) {
          const d = calculateDistance(latitude, longitude, k.lat, k.lng);
          if (d < minKingdomDist) {
            minKingdomDist = d;
            nearestKingdom = k;
          }
        }

        // Derive region label from nearest kingdom
        const regionName = nearestKingdom ? nearestKingdom.name : null;

        // Filter and sort nearby places — return nearest 5
        const processPlaces = (places: Place[]) => {
          return places
            .map(p => ({ ...p, distance: calculateDistance(latitude, longitude, p.lat, p.lng) }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 5);
        };

        setState({
          kingdom: nearestKingdom,
          nearbyHeritageSites: processPlaces(HERITAGE_SITES),
          nearbyMuseums: processPlaces(MUSEUMS),
          nearbyUMKM: processPlaces(UMKM_ARTISANS),
          userCoords: { latitude, longitude },
          regionName,
          isLoading: false,
          permissionDenied: false,
          isOutsideIndonesia: isOutside,
        });
      } catch (error) {
        console.error('Error in useNearbyPlaces:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    }

    getNearbyData();
  }, []);

  return state;
}
