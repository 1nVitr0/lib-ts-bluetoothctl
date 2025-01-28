import { BluetoothEvent } from "..";
import { BluetoothCtlDeviceMapping } from "./BluetoothCtlDeviceMapping.interface";

export interface BluetoothCtlEvent {
  device: BluetoothCtlDeviceMapping;
  event: BluetoothEvent;
}
