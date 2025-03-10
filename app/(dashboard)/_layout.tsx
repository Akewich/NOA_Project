import React, { useState } from "react";
import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import ExploreBottom from "@/components/ExploreBottom";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

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
  const navigation = useNavigation(); // Get navigation object
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
    <View style={{ flex: 1 }}>
      <Tabs
        tabBar={() => (
          <ExploreBottom onCategoryChanged={handleCategoryChange} />
        )}
        screenOptions={{ headerShown: true }}
      >
        {[
          { name: "dashboard", title: "Dashboard" },
          { name: "acceleration", title: "Acceleration" },
          { name: "velocityAngular", title: "Velocity Angular" },
          { name: "vibrationSpeed", title: "Vibration Speed" },
          { name: "vibrationAngle", title: "Vibration Angle" },
          { name: "vibrationDisplacement", title: "Vibration Displacement" },
          { name: "frequency", title: "Frequency" },
        ].map((screen) => (
          <Tabs.Screen
            key={screen.name}
            name={screen.name}
            options={{
              headerTitleAlign: "center",
              title: screen.title,
              headerTransparent: true,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ marginLeft: 15 }}
                >
                  <Text style={{ fontSize: 18, color: colors.primary }}>
                    <Ionicons
                      name="chevron-back-outline"
                      size={30}
                      style={{ alignItems: "center" }}
                      color={colors.icon}
                    />
                  </Text>
                </TouchableOpacity>
              ),
            }}
          />
        ))}
      </Tabs>
    </View>
  );
};
