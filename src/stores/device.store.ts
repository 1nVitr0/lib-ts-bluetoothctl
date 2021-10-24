import { execSync } from "child_process";
import { HaraldDeviceMapping } from "../interfaces/HaraldDeviceMapping.interface";
import { HaraldActions } from "../services/actions.service";
import { extractDeviceName, extractMacAddress, isNewDevice, isMacAddress, extractDevicesFromString } from "../utils/device.util";

export class HaraldDevices {
  devices: HaraldDeviceMapping[] = [];
  actions = new HaraldActions(this);

  constructor() {}

  init() {
    const output = execSync('bluetoothctl devices').toString();
    this.devices = extractDevicesFromString(output);
  }

  findDevice(input: HaraldDeviceMapping['macAddress'] | HaraldDeviceMapping['name']): HaraldDeviceMapping {
    if (isMacAddress(input)) {
      const foundDevice = this.devices.find(({ macAddress }) => macAddress === input);

      if (!foundDevice) {
        throw `Device not found, tried to search for ${input}`;
      }

      return foundDevice;
    } else {
      const foundDevice = this.devices.find(({ name }) => name === input);

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
    const name = extractDeviceName(terminalRow);

    this.devices.push({ macAddress, name });
  }
}
