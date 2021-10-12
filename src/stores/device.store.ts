import { execSync } from "child_process";
import { HaraldDevice } from "../interfaces/HaraldDevice.interface";
import { extractDeviceName, extractMacAddress, isNewDevice, isMacAddress } from "../utils/device.util";

export class HaraldDevices {
  devices: HaraldDevice[] = [];

  constructor() {

  }

  init() {
    const devicesFromTerminal = execSync('bluetoothctl devices').toString().trim().split('\n');
    devicesFromTerminal.forEach((device) => {
      const macAddress = extractMacAddress(device);
      const deviceName = extractDeviceName(device);

      this.devices.push({ deviceName, macAddress });
    });
  }

  findDevice(macAddressToFind: string): HaraldDevice {
    const foundDevice = this.devices.find(({ macAddress }) => macAddress === macAddressToFind);
    if (!foundDevice) {
      throw `Device not found, tried to search for ${macAddressToFind}`;
    }

    return foundDevice;
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

