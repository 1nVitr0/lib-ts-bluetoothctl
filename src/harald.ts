import { execSync } from 'child_process';
import EventEmitter from 'events';
import { IPty, spawn } from 'node-pty';
import { platform } from 'os';
import stripAnsi from 'strip-ansi';
import { BluetoothEvent } from './enums/BluetoothEvent.enum';
import { HaraldDevices } from './stores/device.store';
import { extractMacAddress } from './utils/device.util';
import { determineEvent } from './utils/determineEvent.util';
import { HaraldEvent } from './interfaces/HaraldEvent.interface';
import { HaraldActions } from './services/actions.service';

export class Harald extends EventEmitter {
  private terminal!: IPty;
  private haraldDevices!: HaraldDevices;
  actions!: HaraldActions;

  constructor() {
    super();

    this.haraldDevices = new HaraldDevices();
    this.actions = new HaraldActions(this.haraldDevices);
    this.terminal = spawn('bash', [], {});

    if (platform() == 'linux') {
      if (execSync('type bluetoothctl').includes('/usr/bin/bluetoothctl')) {
        this.terminal.write('bluetoothctl\r');
        this.terminal.write('power on\r');
        this.terminal.write('agent on\r');
        this.haraldDevices.init();
      } else {
        throw 'bluetoothctl not found on the system';
      }

    } else {
      throw `Expected platform linux, recieved platform ${platform()}`;
    }

    this.terminal.onData((terminalRow) => {
      terminalRow = stripAnsi(terminalRow);
      this.haraldDevices.checkForNewDevice(terminalRow);
      this.eventHandling(terminalRow);
    });
  }

  private eventHandling(terminalRow: string): void {
    const event = determineEvent(terminalRow);

    if (Object.values(BluetoothEvent).includes(event as BluetoothEvent)) {
      const eventData: HaraldEvent = {
        device: this.haraldDevices.findDevice(extractMacAddress(terminalRow)),
        event: event as BluetoothEvent,
      };

      this.emit(event as string, eventData);
    }
  }
}
