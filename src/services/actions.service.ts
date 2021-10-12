import { execSync } from "child_process";
import { DeviceInfo } from "../interfaces/DeviceInfo.interface";
import { HaraldDevices } from "../stores/device.store";
import { extractMacAddress, isMacAddress } from "../utils/device.util";
import { outputToJson } from "../utils/outputToJson.util";

export class HaraldActions {
  constructor(private haraldDevices: HaraldDevices) {}

  agent(start: boolean): string {
    return execSync(`bluetoothctl agent ${start ? 'on' : 'off'}`).toString();
  }
  power(start: boolean): string {
    return execSync(`bluetoothctl power ${start ? 'on' : 'off'}`).toString();
  }
  scan(startScan: boolean): string {
    return execSync(`bluetoothctl scan ${startScan ? 'on' : 'off'}`).toString();
  }
  pairable(canPairable: boolean): string {
    return execSync(`bluetoothctl pairable ${canPairable ? 'on' : 'off'}`).toString();
  }
  discoverable(canDiscoverable: boolean): string {
    return execSync(`bluetoothctl discoverable ${canDiscoverable ? 'on' : 'off'}`).toString();
  }
  pair(input: string): string {
    return execSync(`bluetoothctl pair ${isMacAddress(input) ? input : this.haraldDevices.findDevice(input).macAddress}`).toString();
  }
  trust(input: string): string {
    return execSync(`bluetoothctl trust ${isMacAddress(input) ? input : this.haraldDevices.findDevice(input).macAddress}`).toString();
  }
  untrust(input: string): string {
    return execSync(`bluetoothctl untrust ${isMacAddress(input) ? input : this.haraldDevices.findDevice(input).macAddress}`).toString();
  }
  block(input: string): string {
    return execSync(`bluetoothctl block ${isMacAddress(input) ? input : this.haraldDevices.findDevice(input).macAddress}`).toString();
  }
  unblock(input: string): string {
    return execSync(`bluetoothctl unblock ${isMacAddress(input) ? input : this.haraldDevices.findDevice(input).macAddress}`).toString();
  }
  connect(input: string): string {
    return execSync(`bluetoothctl connect ${isMacAddress(input) ? input : this.haraldDevices.findDevice(input).macAddress}`).toString();
  }
  disconnect(input: string): string {
    return execSync(`bluetoothctl disconnect ${isMacAddress(input) ? input : this.haraldDevices.findDevice(input).macAddress}`).toString();
  }
  remove(input: string): string {
    return execSync(`bluetoothctl remove ${isMacAddress(input) ? input : this.haraldDevices.findDevice(input).macAddress}`).toString();
  }
  info(input: string): DeviceInfo {
    const output = execSync(`bluetoothctl info ${isMacAddress(input) ? input : this.haraldDevices.findDevice(input).macAddress}`).toString();
    
    return {
      macAddress: extractMacAddress(output),
      ...outputToJson<DeviceInfo>(output),
    };
  }
  getPairedDevices(): string {
    return execSync(`bluetoothctl paired-devices`).toString();
  }
  getDevices(): string {
    return execSync(`bluetoothctl devices`).toString();
  }
}
