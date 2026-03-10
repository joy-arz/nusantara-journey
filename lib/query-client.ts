import { fetch } from "expo/fetch";
import { QueryClient, QueryFunction } from "@tanstack/react-query";
import Constants from "expo-constants";

/**
 * Gets the base URL for the Express API server (e.g., "http://192.168.1.5:3000").
 * In dev on a physical device, extracts the host IP from Expo's debugger host
 * so we don't hit "localhost" which would refer to the phone itself.
 */
export function getApiUrl(): string {
  if (__DEV__) {
    const debuggerHost =
      Constants.expoGoConfig?.debuggerHost ??
      (Constants as any).manifest?.debuggerHost;
    if (debuggerHost) {
      const ip = debuggerHost.split(":")[0];
      return `http://${ip}:3000/`;
    }
  }

  let host = process.env.EXPO_PUBLIC_DOMAIN || "localhost:3000";
  let url = new URL(host.startsWith("localhost") ? `http://${host}` : `https://${host}`);
  return url.href;
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  route: string,
  data?: unknown | undefined,
): Promise<Response> {
  const baseUrl = getApiUrl();
  const url = new URL(route, baseUrl);

  const res = await fetch(url.toString(), {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const baseUrl = getApiUrl();
    const url = new URL(queryKey.join("/") as string, baseUrl);

    const res = await fetch(url.toString(), {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
