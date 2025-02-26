import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBar } from "@/components/TabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          // tabBarIcon: ({ color }) => (
          //   <Ionicons name="home-outline" size={22} color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="graph"
        options={{
          title: "Graph",
          // tabBarIcon: ({ color }) => (
          //   <Entypo name="line-graph" size={22} color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Predict",
          // tabBarIcon: ({ color }) => (
          //   <Ionicons name="notifications-outline" size={22} color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Setting",
          // tabBarIcon: ({ color }) => (
          //   <Ionicons name="person-outline" size={22} color={color} />
          // ),
        }}
      />
    </Tabs>
  );
}
