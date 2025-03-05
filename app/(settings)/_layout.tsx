import { View, Text } from "react-native";
import React from "react";
import { SplashScreen, Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function SettingLayout() {
  return (
    <Stack>
      <Stack.Screen name="account" options={{ presentation: "modal" }} />
      <Stack.Screen name="delete" options={{ presentation: "modal" }} />
      <Stack.Screen name="reset" options={{ presentation: "modal" }} />
      <Stack.Screen name="theme" options={{ presentation: "modal" }} />
    </Stack>
  );
}
