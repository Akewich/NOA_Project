import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";

// Define types for better TypeScript support
type IconProps = { color: string; size?: number };

// Separate functions for performance optimization
const IndexIcon = ({ color, size = 22 }: IconProps) => (
  <Ionicons name="home-outline" size={size} color={color} />
);
const GraphIcon = ({ color, size = 22 }: IconProps) => (
  <Entypo name="line-graph" size={size} color={color} />
);
const NotificationsIcon = ({ color, size = 22 }: IconProps) => (
  <Ionicons name="notifications-outline" size={size} color={color} />
);
const ProfileIcon = ({ color, size = 22 }: IconProps) => (
  <Ionicons name="person-outline" size={size} color={color} />
);

// Define the icon object with strict type checking
export const icon: Record<
  "index" | "graph" | "notifications" | "profile",
  (props: IconProps) => JSX.Element
> = {
  index: IndexIcon,
  graph: GraphIcon,
  notifications: NotificationsIcon,
  profile: ProfileIcon,
};
