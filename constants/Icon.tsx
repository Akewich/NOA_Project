import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";

// Define types for better TypeScript support
type IconProps = { color: string; size?: number };

// Separate functions for performance optimization
const HomeIcon = ({ color, size = 24 }: IconProps) => (
  <Ionicons name="home-outline" size={size} color={color} />
);
const GraphIcon = ({ color, size = 24 }: IconProps) => (
  <Entypo name="line-graph" size={size} color={color} />
);
const NotificationsIcon = ({ color, size = 24 }: IconProps) => (
  <Ionicons name="notifications-outline" size={size} color={color} />
);
const SettingIcon = ({ color, size = 24 }: IconProps) => (
  <Ionicons name="settings-outline" size={size} color={color} />
);

// Define the icon object with strict type checking
export const icon: Record<
  "home" | "graph" | "notifications" | "setting",
  (props: IconProps) => JSX.Element
> = {
  home: HomeIcon,
  graph: GraphIcon,
  notifications: NotificationsIcon,
  setting: SettingIcon,
};
