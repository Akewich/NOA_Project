import Loading from "@/components/Loading";
import { useFonts } from "expo-font";
import { Redirect, router, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@/utils/cache";

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

  // Define the publishable key for the Clerk SDK
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }

  return (
    <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
      <ClerkLoaded>
        <RootLayoutNav />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  useEffect(() => {
    if (isSignedIn) {
      // Redirect to the home screen after login or reload
      router.push("/(tabs)/home");
    } else {
      // Redirect to the sign-in screen if not signed in
      router.push("/");
    }
  }, [isSignedIn, router]);
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(settings)" options={{ headerShown: false }} />
      <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="forgot"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="otp"
        options={{ presentation: "modal", headerShown: false }}
      />
    </Stack>
  );
}
