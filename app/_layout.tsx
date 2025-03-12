import Loading from "@/components/Loading";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

// Define the publishable key for the Clerk SDK
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

// Prevent splash screen from auto-hiding before assets are loaded.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/Inter_18pt-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate fetching essential data
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (error) {
        console.warn(error);
      } finally {
        setIsAppReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (isAppReady && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isAppReady, fontsLoaded]);

  if (!isAppReady || !fontsLoaded) {
    return <Loading />;
  }
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/signin");
    }
  }, [isLoaded, isSignedIn]);
  return (
    <Stack initialRouteName="signin">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(settings)" options={{ headerShown: false }} />
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ presentation: "modal" }} />
      <Stack.Screen name="forgot" options={{ presentation: "modal" }} />
      <Stack.Screen name="otp" options={{ presentation: "modal" }} />
    </Stack>
  );
}
