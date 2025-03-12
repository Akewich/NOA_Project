// import mqtt from "mqtt";

// // Define MQTT Broker & Topics
// const brokerUrl = "ws://your-mqtt-broker:port"; // Example: ws://test.mosquitto.org:8080
// const topics = [
//   "sensor/acceleration",
//   "sensor/velocityAngular",
//   "sensor/vibrationSpeed",
//   "sensor/vibrationAngle",
//   "sensor/vibrationDisplacement",
//   "sensor/frequency",
// ];

// // Initialize sensor data
// export let sensorData: Record<string, { X: number; Y: number; Z: number }> = {
//   Acceleration: { X: 0, Y: 0, Z: 0 },
//   VelocityAngular: { X: 0, Y: 0, Z: 0 },
//   VibrationSpeed: { X: 0, Y: 0, Z: 0 },
//   VibrationAngle: { X: 0, Y: 0, Z: 0 },
//   VibrationDisplacement: { X: 0, Y: 0, Z: 0 },
//   Frequency: { X: 0, Y: 0, Z: 0 },
// };

// // Connect to MQTT broker
// const client = mqtt.connect(brokerUrl);

// client.on("connect", () => {
//   console.log("📡 Connected to MQTT Broker");
//   topics.forEach((topic) => client.subscribe(topic));
// });

// client.on("message", (topic, message) => {
//   try {
//     const payload = JSON.parse(message.toString());
//     if (sensorData[topic.split("/")[1]]) {
//       sensorData[topic.split("/")[1]] = payload;
//     }
//   } catch (error) {
//     console.error("❌ Error parsing MQTT message:", error);
//   }
// });

// // Publish example data (Optional, for testing)
// export const publishSensorData = () => {
//   client.publish(
//     "sensor/acceleration",
//     JSON.stringify({ X: 12.5, Y: 18.3, Z: 9.8 })
//   );
// };

// export default client;

import mqtt, { MqttClient, IClientOptions } from "mqtt/dist/mqtt";
import { useState, useEffect } from "react";

// Define types for sensor data
interface SensorValue {
  X: number;
  Y: number;
  Z: number;
}

// Define types for sensor data items
export interface SensorDataItem {
  category: string;
  values: SensorValue;
}

// Define type for update callback function
type UpdateCallback = (data: SensorDataItem[]) => void;

// Initial state with typed data
let sensorData: SensorDataItem[] = [
  { category: "Acceleration", values: { X: 0, Y: 0, Z: 0 } },
  { category: "VelocityAngular", values: { X: 0, Y: 0, Z: 0 } },
  { category: "VibrationSpeed", values: { X: 0, Y: 0, Z: 0 } },
  { category: "VibrationAngle", values: { X: 0, Y: 0, Z: 0 } },
  { category: "Vibration Displacement", values: { X: 0, Y: 0, Z: 0 } },
  { category: "Frequency", values: { X: 0, Y: 0, Z: 0 } },
];

// Callback function to notify subscribers when data changes
let updateCallback: UpdateCallback | null = null;

// MQTT connection options
const options: IClientOptions = {
  clientId: "react-native-app-" + Math.random().toString(16).substring(2, 8),
  username: "your-username", // if required
  password: "your-password", // if required
};

// Connect to the MQTT broker
const client: MqttClient = mqtt.connect(
  "mqtt://your-broker-address:port",
  options
);

// Setup connection and subscribe to topics
client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("sensor/acceleration/#");
  client.subscribe("sensor/velocity/#");
  client.subscribe("sensor/vibration/#");
  client.subscribe("sensor/frequency");
});

// Handle incoming messages
client.on("message", (topic: string, message: Buffer) => {
  try {
    const payload = JSON.parse(message.toString()) as SensorValue;

    // Update the appropriate data category based on the topic
    if (topic.startsWith("sensor/acceleration")) {
      updateSensorData("Acceleration", payload);
    } else if (topic.startsWith("sensor/velocity")) {
      updateSensorData("VelocityAngular", payload);
    } else if (topic.startsWith("sensor/vibration/speed")) {
      updateSensorData("VibrationSpeed", payload);
    } else if (topic.startsWith("sensor/vibration/angle")) {
      updateSensorData("VibrationAngle", payload);
    } else if (topic.startsWith("sensor/vibration/displacement")) {
      updateSensorData("Vibration Displacement", payload);
    } else if (topic === "sensor/frequency") {
      updateSensorData("Frequency", payload);
    }

    // Notify subscribers that data has changed
    if (updateCallback) {
      updateCallback([...sensorData]);
    }
  } catch (error) {
    console.error("Error parsing MQTT message:", error);
  }
});

// Helper function to update sensor data
function updateSensorData(category: string, payload: SensorValue): void {
  const index = sensorData.findIndex((item) => item.category === category);
  if (index !== -1) {
    sensorData[index].values = payload;
  }
}

// Handle errors
client.on("error", (err: Error) => {
  console.error("MQTT connection error:", err);
});

// React hook to use MQTT data in components
export function useMQTTData(): SensorDataItem[] {
  const [data, setData] = useState<SensorDataItem[]>(sensorData);

  useEffect(() => {
    // Set the callback function to update state when MQTT data changes
    updateCallback = (newData: SensorDataItem[]) => {
      setData([...newData]); // Create new array reference to trigger re-render
    };

    return () => {
      // Clean up on unmount
      updateCallback = null;
    };
  }, []);

  return data;
}

// Function to publish data to MQTT (for testing)
export function publishTestData(): void {
  const testData: SensorValue = {
    X: Math.random() * 50,
    Y: Math.random() * 50,
    Z: Math.random() * 50,
  };
  client.publish("sensor/acceleration", JSON.stringify(testData));
}

export default client;
