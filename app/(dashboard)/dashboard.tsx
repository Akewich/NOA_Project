import { View, Text, StyleSheet } from "react-native";

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Dashboard Screen</Text>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});
