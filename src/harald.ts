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

    this.terminal.onData((data) => {

      if (data.includes('bluetoothctl is ') && data.includes('/usr/bin/bluetoothctl')) {
        this.terminal.write('bluetoothctl\r');
        this.terminal.write('power on\r');
        this.terminal.write('agent on\r');
      }
      const event = determineEvent(data);

      if (event === BluetoothEvent.Connected) {
        this.emit(BluetoothEvent.Connected, data);
      }

      if (event === BluetoothEvent.Disconnected) {
        this.emit(BluetoothEvent.Disconnected, data);
      }
    });
  }
}