import { ChildProcess, exec, execSync } from "child_process";
import { BluetoothCtlDevice } from "../interfaces/BluetoothCtlDevice.interface";
import { BluetoothCtlDevices } from "../stores/device.store";
import { extractMacAddressesFromString, extractMacAddress, isMacAddress } from "../utils/device.util";
import { outputToJson } from "../utils/outputToJson.util";

export class BluetoothCtlActions {
  scanTerminal!: ChildProcess;

  constructor(private devices: BluetoothCtlDevices) {}

  agent(start: boolean): string {
    return execSync(`bluetoothctl agent ${start ? "on" : "off"}`).toString();
  }
  power(start: boolean): string {
    return execSync(`bluetoothctl power ${start ? "on" : "off"}`).toString();
  }
  scan(startScan: boolean, timeout: number = 60000): void {
    if (startScan) {
      const options = {
        "--timeout": parseInt(timeout.toString()).toString(), // Prevent command injection
      };
      const parameters = (Object.keys(options) as (keyof typeof options)[])
        .map((key) => `${key} ${options[key]}`)
        .join(" ");
      this.scanTerminal = exec(`bluetoothctl ${parameters} scan on`);
    } else if (this.scanTerminal) {
      this.scanTerminal.kill("SIGTERM");
    } else {
      console.warn("No terminal to kill, scanning was probably not on");
    }
  }
  pairable(canPairable: boolean): string {
    return execSync(`bluetoothctl pairable ${canPairable ? "on" : "off"}`).toString();
  }
  discoverable(canDiscoverable: boolean): string {
    return execSync(`bluetoothctl discoverable ${canDiscoverable ? "on" : "off"}`).toString();
  }
  pair(input: string): string {
    return execSync(
      `bluetoothctl pair ${isMacAddress(input) ? input : this.devices.findDevice(input).macAddress}`
    ).toString();
  }
  trust(input: string): string {
    return execSync(
      `bluetoothctl trust ${isMacAddress(input) ? input : this.devices.findDevice(input).macAddress}`
    ).toString();
  }
  untrust(input: string): string {
    return execSync(
      `bluetoothctl untrust ${isMacAddress(input) ? input : this.devices.findDevice(input).macAddress}`
    ).toString();
  }
  block(input: string): string {
    return execSync(
      `bluetoothctl block ${isMacAddress(input) ? input : this.devices.findDevice(input).macAddress}`
    ).toString();
  }
  unblock(input: string): string {
    return execSync(
      `bluetoothctl unblock ${isMacAddress(input) ? input : this.devices.findDevice(input).macAddress}`
    ).toString();
  }
  connect(input: string): string {
    return execSync(
      `bluetoothctl connect ${isMacAddress(input) ? input : this.devices.findDevice(input).macAddress}`
    ).toString();
  }
  disconnect(input: string): string {
    return execSync(
      `bluetoothctl disconnect ${isMacAddress(input) ? input : this.devices.findDevice(input).macAddress}`
    ).toString();
  }
  remove(input: string): string {
    return execSync(
      `bluetoothctl remove ${isMacAddress(input) ? input : this.devices.findDevice(input).macAddress}`
    ).toString();
  }
  info(input: string): BluetoothCtlDevice {
    const output = execSync(
      `bluetoothctl info ${isMacAddress(input) ? input : this.devices.findDevice(input).macAddress}`
    ).toString();

    return {
      ...outputToJson<BluetoothCtlDevice>(output),
      macAddress: extractMacAddress(output),
    };
  }
  getPairedDevices(): BluetoothCtlDevice[] {
    return extractMacAddressesFromString(execSync(`bluetoothctl paired-devices`).toString()).map((macAddress) =>
      this.info(macAddress)
    );
  }
  getDevices(): BluetoothCtlDevice[] {
    return extractMacAddressesFromString(execSync(`bluetoothctl devices`).toString()).map((macAddress) =>
      this.info(macAddress)
    );
  }

  connectedDevices(): BluetoothCtlDevice[] {
    return this.getDevices().filter((device) => device.connected);
  }
}
