import { BluetoothEvent } from "../enums/BluetoothEvent.enum";
import { isNewDevice } from "./device.util";

export const determineEvent = (str: string): BluetoothEvent | undefined => {
  if (/Connected: yes/.test(str)) {
    return BluetoothEvent.Connected;
  }

  if (/Connected: no/.test(str)) {
    return BluetoothEvent.Disconnected;
  }

  if (/Paired: yes/.test(str)) {
    return BluetoothEvent.Paired;
  }

  if (isNewDevice(str)) {
    return BluetoothEvent.NewDevice;
  }
};
