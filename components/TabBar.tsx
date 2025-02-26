import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarBtn from "./TabBarBtn";

// Map route names to IconKeys
const routeToIconKey: Record<
  string,
  "index" | "graph" | "notifications" | "profile"
> = {
  index: "index",
  graph: "graph",
  notifications: "notifications",
  profile: "profile",
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

          return (
            <TabBarBtn
              key={route.name}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              routeName={routeToIconKey[route.name] || "index"}
              label={label}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    margin: 10, // เว้นขอบรอบนอกให้ดูสวย
  },
  tabBarBackground: {
    flexDirection: "row",
    backgroundColor: "#353666", // สีพื้นหลังของแถบปุ่มทั้งหมด
    borderRadius: 16, // ทำให้แถบมีขอบโค้ง
  },
});
