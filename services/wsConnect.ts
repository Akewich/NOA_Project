import { SensorData } from "../components/interfaces/GyroType";

// get url from env
// const wsUrl = process.env.REACT_APP_WS_URL;

class WebSocketService {
  private socket: WebSocket | null = null;
  private url: string;
  private isConnected: boolean = false;
  private listeners: Set<(data: SensorData) => void> = new Set();

  constructor(url: string) {
    this.url = url;
  }

  connect(): void {
    if (this.isConnected) return;

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("✅ WebSocket Connected:", this.url);
      this.isConnected = true;
    };

    this.socket.onmessage = (event) => {
      try {
        const data: SensorData = JSON.parse(event.data);
        console.log("📩 Received:", data);
        this.listeners.forEach((callback) => callback(data));
      } catch (error) {
        console.error("❌ Error parsing message:", error);
      }
    };

    this.socket.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    this.socket.onclose = () => {
      console.log("🔴 WebSocket Disconnected");
      this.isConnected = false;
      setTimeout(() => this.connect(), 5000); // Auto-reconnect
    };
  }

  addListener(callback: (data: SensorData) => void): void {
    this.listeners.add(callback);
  }

  removeListener(callback: (data: SensorData) => void): void {
    this.listeners.delete(callback);
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
      this.isConnected = false;
    }
  }
}

// get url from env
// const wsUrl = process.env.WS_URL || "ws://default-url";
// ws://localhost:8000/ws
const wsUrl = "ws://10.0.2.2:8000/ws";
// const wsUrl = "ws://10.0.2.2:8000/ws";
const wsService = new WebSocketService(wsUrl);

export default wsService;
