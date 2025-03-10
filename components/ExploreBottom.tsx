import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/context/ThemeContext";

const tabItems = [
  { name: "Dashboard" },
  { name: "Acceleration" },
  { name: "VelocityAngular" },
  { name: "VibrationSpeed" },
  { name: "VibrationAngle" },
  { name: "Vibration Displacement" },
  { name: "Frequency" },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

const ExploreBottom = ({ onCategoryChanged }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { colors } = useTheme();

  const selectCategory = (index: number) => {
    setActiveIndex(index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(tabItems[index].name);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: "flex-end",
        marginBottom: 20,
        paddingHorizontal: 20,
      }}
    >
      <View style={styles.tabBar}>
        {tabItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tabButton}
            onPress={() => selectCategory(index)}
          >
            <Text
              style={[
                styles.tabText,
                { color: colors.subText }, // Dynamically set theme text color
                activeIndex === index && { color: colors.icon }, // Highlight active tab
              ]}
            >
              {item.name}
            </Text>
            {activeIndex === index && (
              <View
                style={[
                  styles.activeIndicator,
                  { backgroundColor: colors.icon }, // Highlight active indicator
                ]}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ExploreBottom;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: 50,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "500",
    paddingHorizontal: 20,
  },
  activeIndicator: {
    position: "absolute",
    bottom: 6,
    width: "80%",
    height: 3,
  },
});
