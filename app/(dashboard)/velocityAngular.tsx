import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { PaperProvider } from "react-native-paper";
import { useTheme } from "@/context/ThemeContext";
import SensorChart from "@/components/SensorChart/SensorChart";

const VelocityAngularScreen = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <SensorChart
          sensorKey="velocityangular"
          title="Velocity angular"
          unitLabel="(G)"
        />
      </View>
    </PaperProvider>
  );
};

export default VelocityAngularScreen;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 10,
    },
    chartTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 8,
    },
  });
