import React, { useState } from "react";
import { Tabs, useRouter } from "expo-router";
import ExploreBottom from "@/components/ExploreBottom";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

export default function DashboardTabLayout() {
  return (
    <ThemeProvider>
      <DashboardLayout />
    </ThemeProvider>
  );
}

const DashboardLayout = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState("Dashboard");

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    if (category === "Dashboard") router.push("/dashboard");
    if (category === "Acceleration") router.push("/acceleration");
    if (category === "VelocityAngular") router.push("/velocityAngular");
    if (category === "VibrationSpeed") router.push("/vibrationSpeed");
    if (category === "VibrationAngle") router.push("/vibrationAngle");
    if (category === "Vibration Displacement")
      router.push("/vibrationDisplacement");
    if (category === "Frequency") router.push("/frequency");
  };

  return (
    <Tabs
      tabBar={() => <ExploreBottom onCategoryChanged={handleCategoryChange} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="acceleration" options={{ title: "Acceleration" }} />
      <Tabs.Screen
        name="velocityAngular"
        options={{ title: "VelocityAngular" }}
      />
      <Tabs.Screen
        name="vibrationSpeed"
        options={{ title: "VibrationSpeed" }}
      />
      <Tabs.Screen
        name="vibrationAngle"
        options={{ title: "VibrationAngle" }}
      />
      <Tabs.Screen
        name="vibrationDis"
        options={{ title: "Vibration Displacement" }}
      />
      <Tabs.Screen name="frequency" options={{ title: "Frequency" }} />
    </Tabs>
  );
};
