import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { ThemeProvider, useTheme } from "@/context/ThemeContext"; // Import useTheme
import { TabBar } from "@/components/TabBar";
import { View, StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <ThemeProvider>
      <TabLayoutWithTheme />
    </ThemeProvider>
  );
}

const TabLayoutWithTheme = () => {
  const { colors } = useTheme(); // Access colors from the ThemeContext

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="graph"
          options={{
            title: "Graph",
            tabBarIcon: ({ color }) => (
              <Entypo name="line-graph" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Predict",
            tabBarIcon: ({ color }) => (
              <Ionicons name="notifications-outline" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            title: "Setting",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-outline" size={22} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the background color fills the entire screen
  },
});
