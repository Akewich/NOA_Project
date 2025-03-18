import { connect, MqttClient } from "mqtt/dist/mqtt";
import { Platform } from "react-native";

export interface MqttMessage {
  deviceaddress: string;
  datetime: string;
  x: AxisData;
  y: AxisData;
  z: AxisData;
  temperature: number; // ✅ Ensure this exists
  modbushighspeed: boolean;
}

interface AxisData {
  acceleration: number;
  velocityangular: number;
  vibrationspeed: number;
  vibrationangle: number;
  vibrationdisplacement: number;
  vibrationdisplacementhighspeed: number;
  frequency: number;
}

type MessageCallback = (message: MqttMessage) => void;
// const isAndroid = Platform.OS === "android"; // Detect Android

// const brokerUrl = "mqtt://10.0.2.2:1883/";
// const brokerUrl = "mqtt://192.168.1.1:1883/"; // Replace with your machine's IP
const brokerUrl = "mqtt://localhost:1883/"; // Use WebSocket for Android Emulator

//  "ws://localhost:8083/mqtt"; // 🟢 iOS Simulator (localhost works)
//  "ws://10.0.2.2:8083/mqtt"; // 🟢 Android Emulator (Use 10.0.2.2)

console.log("🔄 Connecting to MQTT at:", brokerUrl);
const topic = "sub_data";

let client: MqttClient | null = null;

const connectToMQTT = (onMessageCallback: MessageCallback): void => {
  console.log("🔄 Connecting to MQTT...");

  if (!client) {
    client = connect(brokerUrl, { reconnectPeriod: 5000 });

    client.on("connect", () => {
      console.log("✅ Connected to MQTT broker!");
      client?.subscribe(topic, (err) => {
        if (err) console.error("❌ Subscription error:", err);
        else console.log(`📡 Subscribed to: ${topic}`);
      });
    });

    client.on("message", (topic, message) => {
      try {
        const parsedMessage: MqttMessage = JSON.parse(message.toString());
        console.log("📩 MQTT Message:", parsedMessage);
        onMessageCallback(parsedMessage);
      } catch (error) {
        console.error("⚠️ Error parsing message:", error);
      }
    });

    client.on("error", (error) => console.error("❌ MQTT Error:", error));
    client.on("close", () => console.warn("⚠️ MQTT Disconnected, retrying..."));
  }
};

const disconnectFromMQTT = (): void => {
  if (client) {
    client.end();
    client = null;
    console.log("🔌 Disconnected from MQTT broker");
  }
};

export { connectToMQTT, disconnectFromMQTT };
