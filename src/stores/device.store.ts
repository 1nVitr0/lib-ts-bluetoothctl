import { execSync } from "child_process";
import { HaraldDevice } from "../interfaces/HaraldDevice.interface";
import { extractDeviceName, extractMacAddress, isNewDevice, isMacAddress, extractDevicesFromString } from "../utils/device.util";

export class HaraldDevices {
  devices: HaraldDevice[] = [];

  constructor() {

  }

  init() {
    const output = execSync('bluetoothctl devices').toString();
    this.devices = extractDevicesFromString(output);
  }

  findDevice(input: string): HaraldDevice {
    if (isMacAddress(input)) {
      const foundDevice = this.devices.find(({ macAddress }) => macAddress === input);

      if (!foundDevice) {
        throw `Device not found, tried to search for ${input}`;
      }

      return foundDevice;
    } else {
      const foundDevice = this.devices.find(({ deviceName }) => deviceName === input);

      if (!foundDevice) {
        throw `Device not found, tried to search for ${input}`;
      }

      return foundDevice;
    }

  }

  checkForNewDevice(terminalRow: string) {
    if (isNewDevice(terminalRow)) {
      this.addDevice(terminalRow);
    }
  }

  private addDevice(terminalRow: string) {
    const macAddress = extractMacAddress(terminalRow);
    const deviceName = extractDeviceName(terminalRow);

    this.devices.push({ macAddress, deviceName });
  }
}

