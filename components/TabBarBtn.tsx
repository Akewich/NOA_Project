import {
  TouchableOpacity,
  StyleSheet,
  Text,
  GestureResponderEvent,
  View,
  ScrollView,
} from "react-native";
import React, { memo } from "react";
import { icon } from "@/constants/Icon";

type IconKeys = keyof typeof icon;

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  isFocused: boolean;
  label: string;
  routeName: IconKeys;
};

const TabBarBtn = ({
  onPress,
  onLongPress,
  isFocused,
  label,
  routeName,
}: Props) => {
  const IconComponent = icon?.[routeName] || (() => null); // Prevent errors if missing

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.container]}
      accessible
      accessibilityRole="button"
    >
      <IconComponent color={isFocused ? "#6f7eff" : "#ffffff"} />
      <Text style={[styles.label, isFocused && styles.focusedText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(TabBarBtn);

const styles = StyleSheet.create({
  btnBackGround: {
    backgroundColor: "#353666",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },
  iconWrapper: {
    padding: 6,
  },
  label: {
    fontSize: 12,
    color: "#ffffff",
    marginTop: 4,
  },
  focusedText: {
    color: "#6f7eff", // Blue text for selected button
    fontWeight: "bold",
  },
});
