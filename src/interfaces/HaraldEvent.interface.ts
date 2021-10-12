import { BluetoothEvent } from "..";
import { HaraldDevice } from "./HaraldDevice.interface";

export interface HaraldEvent {
  device: HaraldDevice,
  event: BluetoothEvent,
}