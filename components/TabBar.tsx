import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarBtn from "./TabBarBtn";

// Map route names to IconKeys
const routeToIconKey: Record<
  string,
  "home" | "graph" | "notifications" | "setting"
> = {
  home: "home",
  graph: "graph",
  notifications: "notifications",
  setting: "setting",
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBarBackground}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // Adding logic for borderRadius on the first and last button
          const borderRadiusStyle = {
            borderTopLeftRadius: index === 0 ? 16 : 0, // Left-most button
            borderBottomRightRadius: index === 3 ? 16 : 0, // Left-most button
            borderBottomLeftRadius: index === 0 ? 16 : 0, // Left-most button
            borderTopRightRadius: index === state.routes.length - 1 ? 16 : 0, // Right-most button
          };

          return (
            <TabBarBtn
              key={route.name}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              routeName={routeToIconKey[route.name] || "home"}
              label={label}
              style={borderRadiusStyle} // Passing borderRadius style
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    margin: 10, // Adding outer margin for visual spacing
  },
  tabBarBackground: {
    flexDirection: "row", // Horizontal layout of tab buttons
  },
});
