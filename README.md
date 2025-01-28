# Bluetoothtl

This is a fork of [@sieem/bluetooth](https://github.com/sieem/bluetooth).

A node wrapper for bluetoothctl

Installation
------------

    npm install @InVitr0/bluetoothctl

Usage
-----

```js
const { BluetoothCtl, BluetoothEvent } = require('@sieem/bluetooth');
const bluetooth = new BluetoothCtl();

// Available events
bluetooth.on(BluetoothEvent.Connected, ({ device, event }) => {
  console.log(event); // 'connected'
  console.log(device); // { macAddress: '00:00:00:00:00:00', name: 'Pocophone F1' }
});

bluetooth.on(BluetoothEvent.Paired, ({ device, event }) => {
  console.log(event); // 'paired'
  console.log(device); // { macAddress: '00:00:00:00:00:00', name: 'Pocophone F1' }
});

bluetooth.on(BluetoothEvent.Disconnected, ({ device, event }) => {
  console.log(event); // 'disconnected'
  console.log(device); // { macAddress: '00:00:00:00:00:00', name: 'Pocophone F1' }
});

bluetooth.on(BluetoothEvent.NewDevice, ({ device, event }) => {
  console.log(event); // 'disconnected'
  console.log(device); // { macAddress: '00:00:00:00:00:00', name: 'Pocophone F1' }
});

// Available actions
bluetooth.actions.agent(start: boolean)
bluetooth.actions.power(start: boolean)
bluetooth.actions.scan(startScan: boolean, timeout: number)
bluetooth.actions.pairable(canPairable: boolean)
bluetooth.actions.discoverable(canDiscoverable: boolean)
bluetooth.actions.pair(input: macAddress || name)
bluetooth.actions.trust(input: macAddress || name)
bluetooth.actions.untrust(input: macAddress || name)
bluetooth.actions.block(input: macAddress || name)
bluetooth.actions.unblock(input: macAddress || name)
bluetooth.actions.connect(input: macAddress || name)
bluetooth.actions.disconnect(input: macAddress || name)
bluetooth.actions.remove(input: macAddress || name)
bluetooth.actions.info(input: macAddress || name): {macAddress, name, paired, connected, ...}
bluetooth.actions.getPairedDevices(): [{ macAddress: '00:00:00:00:00:00', name: 'Pocophone F1' }]
bluetooth.actions.getDevices(): [{ macAddress: '00:00:00:00:00:00', name: 'Pocophone F1' }]
bluetooth.actions.getConnectedDevices(): [{ macAddress: '00:00:00:00:00:00', name: 'Pocophone F1' }]
```

