import { execSync } from "child_process";
import { HaraldDevice } from "../interfaces/HaraldDevice.interface";
import { HaraldActions } from "../services/actions.service";
import { extractDeviceName, extractMacAddress, isNewDevice, isMacAddress, extractDevicesFromString } from "../utils/device.util";

export class HaraldDevices {
  devices: HaraldDevice[] = [];
  actions = new HaraldActions(this);

  constructor() {}

  init() {
    const output = execSync('bluetoothctl devices').toString();
    this.devices = extractDevicesFromString(output)
      .map((device) => ({
        ...device,
        connected: this.isConnected(device.macAddress),
      }));
  }

  findDevice(input: HaraldDevice['macAddress'] | HaraldDevice['deviceName']): HaraldDevice {
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

  updateConnected(macAddress: HaraldDevice['macAddress']) {
    const device = this.findDevice(macAddress);
    device.connected = this.isConnected(macAddress);
  }

  connectedDevices() {
    return this.devices.filter((device) => device.connected);
  }

  private addDevice(terminalRow: string) {
    const macAddress = extractMacAddress(terminalRow);
    const deviceName = extractDeviceName(terminalRow);
    const connected = this.isConnected(macAddress);

    this.devices.push({ macAddress, deviceName, connected });
  }

  private isConnected(macAddress: HaraldDevice['macAddress']) {
    const { connected } = this.actions.info(macAddress);
    return connected;
  }
}

