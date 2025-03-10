import { View, Text, StyleSheet } from "react-native";

const AccelerationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Acceleration Screen</Text>
    </View>
  );
};

export default AccelerationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
