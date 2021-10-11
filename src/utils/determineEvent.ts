import { BluetoothEvent } from "../enums/BluetoothEvent.enum";

export const determineEvent = (str: string): BluetoothEvent | undefined => {
  if (/Connected: yes/.test(str)) {
    return BluetoothEvent.Connected;
  }

  if (/Connected: no/.test(str)) {
    return BluetoothEvent.Disconnected;
  }
};
