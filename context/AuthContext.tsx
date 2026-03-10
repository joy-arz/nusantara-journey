import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Platform } from "react-native";
import { apiRequest } from "@/lib/query-client";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "@/lib/firebase";

WebBrowser.maybeCompleteAuthSession();

interface User {
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
  email: string | null;
}

interface AuthContextValue {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const AUTH_STORAGE_KEY = "nusantara_auth_user";

function getGoogleClientId() {
  if (Platform.OS === "ios") return process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
  if (Platform.OS === "android") return process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
  return process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const discovery = AuthSession.useAutoDiscovery("https://accounts.google.com");

  const redirectUri = AuthSession.makeRedirectUri({ scheme: "nusantarajourney" });
  const clientId = getGoogleClientId() || "";

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId,
      scopes: ["openid", "profile", "email"],
      redirectUri,
      responseType: AuthSession.ResponseType.IdToken,
    },
    discovery
  );

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      if (id_token) {
        handleFirebaseSignIn(id_token);
      }
    }
  }, [response]);

  const loadUser = async () => {
    try {
      const saved = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load user", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFirebaseSignIn = async (googleIdToken: string) => {
    try {
      setIsLoading(true);
      const credential = GoogleAuthProvider.credential(googleIdToken);
      const userCredential = await signInWithCredential(auth, credential);
      const firebaseIdToken = await userCredential.user.getIdToken();

      const res = await apiRequest("POST", "/api/auth/firebase", {
        idToken: firebaseIdToken,
      });
      const serverUser: User = await res.json();

      setUser(serverUser);
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(serverUser));
    } catch (e) {
      console.error("Firebase sign-in failed", e);
      Alert.alert("Sign-In Error", "Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    if (!clientId) {
      Alert.alert(
        "Google Sign-In Not Configured",
        "Set EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID (and optionally IOS/ANDROID client IDs) in your .env file. See SETUP.md for instructions.",
        [{ text: "OK" }]
      );
      return;
    }

    if (!request) {
      Alert.alert("Error", "Google Sign-In is still loading. Please try again.");
      return;
    }

    await promptAsync();
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      await apiRequest("POST", "/api/auth/logout");
    } catch {
      // Best-effort logout
    }
    setUser(null);
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
