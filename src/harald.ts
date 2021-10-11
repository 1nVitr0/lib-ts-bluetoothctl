import EventEmitter from 'events';
import { IPty, spawn } from 'node-pty';
import { platform } from 'os';
import { BluetoothEvent } from './enums/BluetoothEvent.enum';
import { determineEvent } from './utils/determineEvent';

export interface IHarald {
  autoAccept: boolean;
}

export class Harald extends EventEmitter {
  terminal!: IPty;


  constructor(options: IHarald) {
    super();

    this.terminal = spawn('bash', [], {
      name: 'xterm-color',
      cols: 100,
      rows: 40,
    });

    if (platform() == 'linux') {
      this.terminal.write('type bluetoothctl\r');
    } else {
      throw `Expected platform linux, recieved platform ${platform()}`;
    }

    this.terminal.onData((terminalRow) => {
      this.startBlueControl(terminalRow);
      this.eventHandling(terminalRow);
    });
  }

  private startBlueControl(terminalRow: string) {
    if (terminalRow.includes('bluetoothctl is ') && terminalRow.includes('/usr/bin/bluetoothctl')) {
      this.terminal.write('bluetoothctl\r');
      this.terminal.write('power on\r');
      this.terminal.write('agent on\r');
    }
  }

  private eventHandling(terminalRow: string) {
    const event = determineEvent(terminalRow);

    if (Object.values(BluetoothEvent).includes(event as BluetoothEvent)) {
      this.emit(event as string, terminalRow);
    }
  }
}