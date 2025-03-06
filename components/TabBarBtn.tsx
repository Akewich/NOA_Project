import {
  TouchableOpacity,
  StyleSheet,
  Text,
  GestureResponderEvent,
} from "react-native";
import React, { memo } from "react";
import { icon } from "@/constants/Icon";
import { useTheme } from "../context/ThemeContext"; // Import the theme context

type IconKeys = keyof typeof icon;

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  isFocused: boolean;
  label: string;
  routeName: IconKeys;
  style?: object; // Add style prop for dynamic styling
};

const TabBarBtn = ({
  onPress,
  onLongPress,
  isFocused,
  label,
  routeName,
  style, // Accepting style prop
}: Props) => {
  const { colors } = useTheme(); // Use theme colors from context

  const IconComponent = icon?.[routeName] || (() => null);

  // Dynamic color for focused and unfocused states
  const iconColor = isFocused ? colors.icon : colors.text;

  // Background color for focused tab button
  const backgroundColor = isFocused ? colors.card : colors.card; // Change this based on your design

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        styles.container,
        style,
        { backgroundColor }, // Set background color dynamically
      ]}
      accessible
      accessibilityRole="button"
    >
      <IconComponent color={iconColor} />
      <Text
        style={[
          styles.label,
          { color: isFocused ? colors.icon : colors.text },
          isFocused && styles.focusedText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(TabBarBtn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12, // Ensure border radius is applied for all buttons
  },
  iconWrapper: {
    padding: 6,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  focusedText: {
    fontWeight: "bold",
  },
});
