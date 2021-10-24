import { ChildProcess, exec, execSync } from "child_process";
import { HaraldDevice } from "../interfaces/HaraldDevice.interface";
import { HaraldDevices } from "../stores/device.store";
import { extractMacAddressesFromString, extractMacAddress, isMacAddress } from "../utils/device.util";
import { outputToJson } from "../utils/outputToJson.util";

export class HaraldActions {
  scanTerminal!: ChildProcess;

  constructor(private haraldDevices: HaraldDevices) {}

  agent(start: boolean): string {
    return execSync(`bluetoothctl agent ${start ? 'on' : 'off'}`).toString();
  }
  power(start: boolean): string {
    return execSync(`bluetoothctl power ${start ? 'on' : 'off'}`).toString();
  }
  scan(startScan: boolean): void {
    if (startScan) {
      this.scanTerminal = exec('bluetoothctl scan on');
    } else if (this.scanTerminal) {
      this.scanTerminal.kill('SIGTERM');
    } else {
      console.warn('No terminal to kill, scanning was probably not on');
    }
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
  info(input: string): HaraldDevice {
    const output = execSync(`bluetoothctl info ${isMacAddress(input) ? input : this.haraldDevices.findDevice(input).macAddress}`).toString();
    
    return {
      ...outputToJson<HaraldDevice>(output),
      macAddress: extractMacAddress(output),
    };
  }
  getPairedDevices(): HaraldDevice[] {
    return extractMacAddressesFromString(execSync(`bluetoothctl paired-devices`).toString()).map((macAddress) => this.info(macAddress));
  }
  getDevices(): HaraldDevice[] {
    return extractMacAddressesFromString(execSync(`bluetoothctl devices`).toString()).map((macAddress) => this.info(macAddress));
  }

  connectedDevices(): HaraldDevice[] {
    return this.getDevices().filter((device) => device.connected);
  }
}
