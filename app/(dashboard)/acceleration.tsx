// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
// import {
//   VictoryChart,
//   VictoryLine,
//   VictoryScatter,
//   VictoryTheme,
//   VictoryAxis,
//   VictoryStack,
// } from "victory-native";
// import { Picker } from "@react-native-picker/picker";

// const AccelerationScreen = () => {
//   const [xData, setXData] = useState<{ x: number; y: number }[]>([]);
//   const [yData, setYData] = useState<{ x: number; y: number }[]>([]);
//   const [zData, setZData] = useState<{ x: number; y: number }[]>([]);
//   const [temperature, setTemperature] = useState(0);
//   const [chartType, setChartType] = useState("line");

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const now = Date.now();
//       const newX = { x: now, y: Math.random() * 10 - 5 };
//       const newY = { x: now, y: Math.random() * 10 - 5 };
//       const newZ = { x: now, y: Math.random() * 10 - 5 };

//       setXData((prev) => {
//         const newData = [...prev.slice(-19), newX];
//         // console.log("Updated X Data:", newData); // Log data for x-axis
//         return newData;
//       });

//       setYData((prev) => {
//         const newData = [...prev.slice(-19), newY];
//         // console.log("Updated Y Data:", newData); // Log data for y-axis
//         return newData;
//       });

//       setZData((prev) => {
//         const newData = [...prev.slice(-19), newZ];
//         // console.log("Updated Z Data:", newData); // Log data for z-axis
//         return newData;
//       });

//       setTemperature(Math.random() * 30);
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const renderChart = () => {
//     if (!xData.length) return <Text>Loading chart data...</Text>;

//     const xDomain: [number, number] = [
//       xData[0]?.x || 0,
//       xData[xData.length - 1]?.x || 0,
//     ];

//     return (
//       <VictoryChart
//         width={Dimensions.get("window").width - 10}
//         height={300}
//         theme={VictoryTheme.material}
//         domain={{
//           x: xDomain as [number, number],
//           y: [-20, 20], // Adjust the y-domain based on your data
//         }}
//       >
//         <VictoryAxis />
//         <VictoryAxis dependentAxis />

//         {chartType === "line" && (
//           <VictoryStack>
//             <VictoryLine
//               data={xData}
//               style={{
//                 data: { stroke: "#FF9AA2", strokeWidth: 2 },
//               }}
//             />
//             <VictoryLine
//               data={yData}
//               style={{
//                 data: { stroke: "#9EDFFF", strokeWidth: 2 },
//               }}
//             />
//             <VictoryLine
//               data={zData}
//               style={{
//                 data: { stroke: "#B5EAD7", strokeWidth: 2 },
//               }}
//             />
//           </VictoryStack>
//         )}

//         {chartType === "scatter" && (
//           <VictoryStack>
//             <VictoryScatter
//               data={xData}
//               size={4}
//               style={{ data: { fill: "#FF9AA2" } }}
//             />
//             <VictoryScatter
//               data={yData}
//               size={4}
//               style={{ data: { fill: "#9EDFFF" } }}
//             />
//             <VictoryScatter
//               data={zData}
//               size={4}
//               style={{ data: { fill: "#B5EAD7" } }}
//             />
//           </VictoryStack>
//         )}
//       </VictoryChart>
//     );
//   };

//   return (
//     <View style={styles.scrollContainer}>
//       <View style={styles.container}>
//         <Text style={styles.title}>Device Address: 50</Text>
//         <Text style={styles.subtitle}>
//           Temperature: {temperature.toFixed(2)}°C
//         </Text>

//         <Picker
//           selectedValue={chartType}
//           onValueChange={(value) => setChartType(value)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Line Plot" value="line" />
//           <Picker.Item label="Scatter Plot" value="scatter" />
//         </Picker>

//         <View style={styles.chartContainer}>{renderChart()}</View>
//         {/* Legend */}
//         <View style={styles.legend}>
//           <View style={styles.legendItem}>
//             <View
//               style={[styles.legendColor, { backgroundColor: "#FF9AA2" }]}
//             />
//             <Text>X-Axis</Text>
//           </View>
//           <View style={styles.legendItem}>
//             <View
//               style={[styles.legendColor, { backgroundColor: "#9EDFFF" }]}
//             />
//             <Text>Y-Axis</Text>
//           </View>
//           <View style={styles.legendItem}>
//             <View
//               style={[styles.legendColor, { backgroundColor: "#B5EAD7" }]}
//             />
//             <Text>Z-Axis</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F7FF",
//     padding: 20,
//     paddingTop: 60,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   subtitle: {
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   picker: {
//     height: 50,
//     width: "100%",
//     marginBottom: 10,
//   },
//   chartContainer: {
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   legend: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: 10,
//   },
//   legendItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 10,
//   },
//   legendColor: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     marginRight: 5,
//   },
// });

// export default AccelerationScreen;

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryAxis,
  VictoryStack,
} from "victory-native";
import { Picker } from "@react-native-picker/picker";
import wsService from "@/services/wsConnect";
import { SensorData } from "@/components/interfaces/GyroType";

const AccelerationScreen = () => {
  const [xData, setXData] = useState<{ x: number; y: number }[]>([]);
  const [yData, setYData] = useState<{ x: number; y: number }[]>([]);
  const [zData, setZData] = useState<{ x: number; y: number }[]>([]);
  const [temperature, setTemperature] = useState(0);
  const [chartType, setChartType] = useState("scatter");

  useEffect(() => {
    const handleWebsocketMessage = (message: SensorData) => {
      const timestamp = new Date(message.datetime).getTime();

      // Update chart data
      setXData((prev) => [
        ...prev.slice(-19),
        { x: timestamp, y: message.x.acceleration },
      ]);
      setYData((prev) => [
        ...prev.slice(-19),
        { x: timestamp, y: message.y.acceleration },
      ]);
      setZData((prev) => [
        ...prev.slice(-19),
        { x: timestamp, y: message.z.acceleration },
      ]);

      setTemperature(message.temperature); // Update temperature
    };

    // Add listener for WebSocket messages
    wsService.connect();
    wsService.addListener(handleWebsocketMessage);

    // Cleanup function to close WebSocket connection and remove listener
    return () => {
      wsService.removeListener(handleWebsocketMessage);
      wsService.close();
    };
  }, []);

  const renderChart = () => {
    if (!xData.length) return <Text>Loading chart data...</Text>;

    const xDomain: [number, number] = [
      xData[0]?.x || 0,
      xData[xData.length - 1]?.x || 0,
    ];

    return (
      <VictoryChart
        width={Dimensions.get("window").width - 10}
        height={300}
        theme={VictoryTheme.material}
        domain={{
          x: xDomain as [number, number],
          y: [-20, 20], // Adjust the y-domain based on your data
        }}
      >
        <VictoryAxis />
        <VictoryAxis dependentAxis />

        {chartType === "line" && (
          <VictoryStack>
            <VictoryLine
              data={xData}
              style={{
                data: { stroke: "#FF9AA2", strokeWidth: 2 },
              }}
            />
            <VictoryLine
              data={yData}
              style={{
                data: { stroke: "#9EDFFF", strokeWidth: 2 },
              }}
            />
            <VictoryLine
              data={zData}
              style={{
                data: { stroke: "#B5EAD7", strokeWidth: 2 },
              }}
            />
          </VictoryStack>
        )}

        {chartType === "scatter" && (
          <VictoryStack>
            <VictoryScatter
              data={xData}
              size={4}
              style={{ data: { fill: "#FF9AA2" } }}
            />
            <VictoryScatter
              data={yData}
              size={4}
              style={{ data: { fill: "#9EDFFF" } }}
            />
            <VictoryScatter
              data={zData}
              size={4}
              style={{ data: { fill: "#B5EAD7" } }}
            />
          </VictoryStack>
        )}
      </VictoryChart>
    );
  };

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Device Address: 50</Text>
        <Text style={styles.subtitle}>
          Temperature: {temperature.toFixed(2)}°C
        </Text>

        <Picker
          selectedValue={chartType}
          onValueChange={(value) => setChartType(value)}
          style={styles.picker}
        >
          <Picker.Item label="Line Plot" value="line" />
          <Picker.Item label="Scatter Plot" value="scatter" />
        </Picker>

        <View style={styles.chartContainer}>{renderChart()}</View>
        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#FF9AA2" }]}
            />
            <Text>X-Axis</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#9EDFFF" }]}
            />
            <Text>Y-Axis</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#B5EAD7" }]}
            />
            <Text>Z-Axis</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F7FF",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 10,
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
});

export default AccelerationScreen;
