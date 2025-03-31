import React, { useMemo, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/context/ThemeContext";
import { useFonts } from "expo-font";

// ✅ Import SVG icon components (จากไฟล์ที่แปลงแล้ว)
import OverviewIcon from "../assets/images/grid_view.svg";
import AccIcon from "../assets/images/readiness_score.svg";
import VelAngIcon from "../assets/images/device_hub.svg";
import VelSpdIcon from "../assets/images/acute.svg";
import VibAngIcon from "../assets/images/Group 1.svg";
import VibDisIcon from "../assets/images/animation.svg";
import FreqIcon from "../assets/images/earthquake.svg";

// ✅ Tab items array
const tabItems = [
  { label: "OVERVIEW", value: "Dashboard", icon: OverviewIcon },
  { label: "ACC.", value: "Acceleration", icon: AccIcon },
  { label: "VEL.ANG", value: "VelocityAngular", icon: VelAngIcon },
  { label: "VEL.SPD", value: "VibrationSpeed", icon: VelSpdIcon },
  { label: "VIB.ANG", value: "VibrationAngle", icon: VibAngIcon },
  { label: "VIB.DIS", value: "Vibration Displacement", icon: VibDisIcon },
  { label: "FREQ", value: "Frequency", icon: FreqIcon },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

const ExploreBottom = ({ onCategoryChanged }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [fontsLoaded] = useFonts({
    LilitaOne: require("../assets/fonts/LilitaOne-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  const selectCategory = (index: number) => {
    setActiveIndex(index);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(tabItems[index].value);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.tabBar}>
          {tabItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeIndex === index;

            return (
              <TouchableOpacity
                key={index}
                style={styles.tabButton}
                onPress={() => selectCategory(index)}
              >
                <IconComponent
                  width={24}
                  height={24}
                  color={isActive ? colors.icon : colors.revertText}
                />
                <Text
                  style={{
                    color: isActive ? colors.icon : colors.revertText,
                    fontFamily: "LilitaOne",
                    fontSize: 12,
                    marginTop: 3,
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ExploreBottom;

// ✅ Dynamic styles
const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.block,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    scrollContent: {
      alignItems: "flex-end",
      paddingHorizontal: 20,
    },
    tabBar: {
      flexDirection: "row",
      height: 90,
    },
    tabButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 17,
    },
  });
