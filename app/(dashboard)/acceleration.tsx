import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryAxis,
  VictoryStack,
} from "victory-native";
import { useTheme } from "@/context/ThemeContext";
import wsService from "@/services/wsConnect";
import { SensorData } from "@/components/interfaces/GyroType";

const AccelerationScreen = () => {
  const [xData, setXData] = useState<{ x: number; y: number }[]>([]);
  const [yData, setYData] = useState<{ x: number; y: number }[]>([]);
  const [zData, setZData] = useState<{ x: number; y: number }[]>([]);
  const [chartType, setChartType] = useState<"line" | "scatter">("line");
  const [selectedAxes, setSelectedAxes] = useState({
    x: true,
    y: true,
    z: true,
  });

  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  // Mock data structure
  // Mock data structure
  const mockRawData = Array.from({ length: 20 }, (_, i) => {
    const timestamp = Date.now() + i * 1000;
    return {
      datetime: new Date(timestamp).toISOString(),
      x: { acceleration: Math.random() * 10 - 5 },
      y: { acceleration: Math.random() * 10 - 5 },
      z: { acceleration: Math.random() * 10 - 5 },
    };
  });

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index >= mockRawData.length) {
        clearInterval(interval);
        return;
      }

      const data = mockRawData[index];
      const time = new Date(data.datetime).getTime();

      setXData((prev) => [
        ...prev.slice(-19),
        { x: time, y: data.x.acceleration },
      ]);
      setYData((prev) => [
        ...prev.slice(-19),
        { x: time, y: data.y.acceleration },
      ]);
      setZData((prev) => [
        ...prev.slice(-19),
        { x: time, y: data.z.acceleration },
      ]);

      index++;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   wsService.connect();

  //   const onMessage = (message: SensorData) => {
  //     const time = new Date(message.datetime).getTime();
  //     setXData((prev) => [
  //       ...prev.slice(-19),
  //       { x: time, y: message.x.acceleration },
  //     ]);
  //     setYData((prev) => [
  //       ...prev.slice(-19),
  //       { x: time, y: message.y.acceleration },
  //     ]);
  //     setZData((prev) => [
  //       ...prev.slice(-19),
  //       { x: time, y: message.z.acceleration },
  //     ]);
  //   };

  //   wsService.addListener(onMessage);
  //   return () => {
  //     wsService.removeListener(onMessage);
  //     wsService.close();
  //   };
  // }, []);

  const renderChart = () => {
    if (!xData.length) return <ActivityIndicator />;

    const domainX: [number, number] = [
      xData[0]?.x || 0,
      xData[xData.length - 1]?.x || 0,
    ];

    const commonProps = {
      size: 4,
    };

    return (
      <VictoryChart
        width={Dimensions.get("window").width - 10}
        height={260}
        theme={VictoryTheme.material}
        domain={{ x: domainX, y: [-20, 20] }}
      >
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryStack>
          {selectedAxes.x &&
            (chartType === "line" ? (
              <VictoryLine
                data={xData}
                style={{ data: { stroke: "#FF9AA2" } }}
              />
            ) : (
              <VictoryScatter
                data={xData}
                {...commonProps}
                style={{ data: { fill: "#FF9AA2" } }}
              />
            ))}
          {selectedAxes.y &&
            (chartType === "line" ? (
              <VictoryLine
                data={yData}
                style={{ data: { stroke: "#9EDFFF" } }}
              />
            ) : (
              <VictoryScatter
                data={yData}
                {...commonProps}
                style={{ data: { fill: "#9EDFFF" } }}
              />
            ))}
          {selectedAxes.z &&
            (chartType === "line" ? (
              <VictoryLine
                data={zData}
                style={{ data: { stroke: "#B5EAD7" } }}
              />
            ) : (
              <VictoryScatter
                data={zData}
                {...commonProps}
                style={{ data: { fill: "#B5EAD7" } }}
              />
            ))}
        </VictoryStack>
      </VictoryChart>
    );
  };

  const toggleAxis = (axis: "x" | "y" | "z") => {
    setSelectedAxes((prev) => ({ ...prev, [axis]: !prev[axis] }));
  };

  return (
    <View style={styles.container}>
      {/* Date & Device Header */}
      <View style={[styles.header, { backgroundColor: colors.block }]}>
        <View>
          <Text style={styles.headerLabel}>22 MARCH 2025</Text>
          <Text style={styles.headerTime}>00:00:00 AM</Text>
        </View>
        <View style={styles.deviceBlock}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>From:</Text>
          <Text style={{ color: "#4CAF50", fontWeight: "bold" }}> VIB01</Text>
        </View>
      </View>

      {/* Chart Title + Type */}
      <Text style={styles.title}>
        ACCELERATION: {chartType.toUpperCase()} PLOT
      </Text>
      {/* Chart */}
      <View style={styles.chartWrapper}>{renderChart()}</View>
      {/* Chart Toggle */}
      <View style={styles.toggleRow}>
        {["line", "scatter"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setChartType(type as "line" | "scatter")}
            style={[
              styles.toggleButton,
              chartType === type && { backgroundColor: "#4CAF50" },
            ]}
          >
            <Text style={{ color: chartType === type ? "#fff" : "#000" }}>
              {type.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Axis Filter */}
      <View style={styles.axisRow}>
        {["x", "y", "z"].map((axis) => (
          <TouchableOpacity
            key={axis}
            onPress={() => toggleAxis(axis as "x" | "y" | "z")}
            style={[
              styles.axisBox,
              selectedAxes[axis as "x" | "y" | "z"] && {
                backgroundColor: "#4CAF50",
              },
            ]}
          >
            <Text style={styles.axisLabel}>{axis.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default AccelerationScreen;

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: 50,
      paddingHorizontal: 10,
    },
    header: {
      borderRadius: 12,
      padding: 16,
      marginBottom: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerLabel: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    headerTime: {
      color: "#ccc",
      fontSize: 14,
    },
    deviceBlock: {
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      fontSize: 15,
      fontWeight: "bold",
      marginVertical: 10,
    },
    toggleRow: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 8,
      gap: 10,
    },
    toggleButton: {
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ccc",
    },
    axisRow: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 15,
      marginBottom: 10,
    },
    axisBox: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: "#ccc",
      justifyContent: "center",
      alignItems: "center",
    },
    axisLabel: {
      fontWeight: "bold",
      color: "#fff",
    },
    chartWrapper: {
      backgroundColor: "#fff",
      paddingVertical: 10,
    },
  });
