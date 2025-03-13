import { useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect, Stack, usePathname } from "expo-router";

export default function AuthLayout() {
  const { user } = useUser();
  const pathName = usePathname();
  const { isSignedIn } = useAuth();

  //  Redirect to onboarding if user is signed in but onboarding is not completed
  if (isSignedIn && user?.unsafeMetadata?.onboarding_completed !== true) {
    if (pathName !== "/auth/complete-your-account") {
      return <Redirect href="/signup" />;
    }
  }

  // Redirect to tabs if user is signed in and onboarding is completed
  if (isSignedIn && user?.unsafeMetadata?.onboarding_completed === true) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}
