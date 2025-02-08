import { execSync } from "child_process";
import EventEmitter from "events";
import { IPty, spawn } from "node-pty";
import { platform } from "os";
import stripAnsi from "strip-ansi";
import { BluetoothEvent } from "./enums/BluetoothEvent.enum";
import { BluetoothCtlDevices } from "./stores/device.store";
import { extractMacAddress } from "./utils/device.util";
import { determineEvent } from "./utils/determineEvent.util";
import { BluetoothCtlEvent } from "./interfaces/BluetoothCtlEvent.interface";
import { BluetoothCtlActions } from "./services/actions.service";
import { BluetoothCtlDeviceMapping } from "./interfaces/BluetoothCtlDeviceMapping.interface";

export class BluetoothCtl extends EventEmitter {
  private terminal: IPty = spawn("bash", [], {});
  private devices = new BluetoothCtlDevices();
  actions = new BluetoothCtlActions(this.devices);

  constructor() {
    super();

    if (platform() === "linux") {
      if (execSync("type bluetoothctl").includes("/usr/bin/bluetoothctl")) {
        this.terminal.write("bluetoothctl\r");
        this.terminal.write("power on\r");
        this.terminal.write("agent on\r");
        this.devices.init();
      } else {
        throw "bluetoothctl not found on the system";
      }
    } else {
      throw `Expected platform linux, recieved platform ${platform()}`;
    }

    this.terminal.onData((terminalRow) => {
      terminalRow = stripAnsi(terminalRow);
      this.devices.checkForNewDevice(terminalRow);
      this.eventHandling(terminalRow);
    });
  }

  private eventHandling(terminalRow: string): void {
    const event = determineEvent(terminalRow);

    if (Object.values(BluetoothEvent).includes(event as BluetoothEvent)) {
      const macAddress = extractMacAddress(terminalRow);
      let device: BluetoothCtlDeviceMapping = { macAddress, name: "Unknown Device" };

      try {
        device = this.devices.findDevice(macAddress);
      } catch (error) {
        // Ignore on connect, device immediately disconnected
      }

      const eventData: BluetoothCtlEvent = {
        device,
        event: event as BluetoothEvent,
      };

      this.emit(event as string, eventData);
    }
  }
}
