export interface AxisData {
  acceleration: number;
  velocityangular: number;
  vibrationspeed: number;
  vibrationangle: number;
  vibrationdisplacement: number;
  vibrationdisplacementhighspeed: number;
  frequency: number;
}

export interface SensorData {
  deviceaddress: string;
  datetime: string;
  x: AxisData;
  y: AxisData;
  z: AxisData;
  temperature: number;
  modbushighspeed: boolean;
}
