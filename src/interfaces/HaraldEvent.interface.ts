import { BluetoothEvent } from "..";
import { HaraldDeviceMapping } from "./HaraldDeviceMapping.interface";

export interface HaraldEvent {
  device: HaraldDeviceMapping,
  event: BluetoothEvent,
}