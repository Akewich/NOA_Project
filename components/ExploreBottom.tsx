import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

// You can modify this based on your needs
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

  const selectCategory = (index: number) => {
    setActiveIndex(index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(tabItems[index].name);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      //   style={styles.container}
      contentContainerStyle={{
        alignItems: "flex-end",
        marginBottom: 20,
        gap: 20,
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
                activeIndex === index && styles.activeTabText,
              ]}
            >
              {item.name}
            </Text>
            {activeIndex === index && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ExploreBottom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
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
    color: "#8E8E93",
    fontWeight: "500",
    paddingHorizontal: 20,
  },
  activeTabText: {
    color: "#4CD964",
    fontWeight: "600",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 6,
    width: "80%",
    height: 3,
    backgroundColor: "#4CD964",
  },
});
