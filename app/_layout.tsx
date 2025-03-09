import Loading from "@/components/Loading";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

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
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(settings)" options={{ headerShown: false }} />
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ presentation: "modal" }} />
      <Stack.Screen name="signup" options={{ presentation: "modal" }} />
      <Stack.Screen name="forgot" options={{ presentation: "modal" }} />
      <Stack.Screen name="otp" options={{ presentation: "modal" }} />
    </Stack>
  );
}
