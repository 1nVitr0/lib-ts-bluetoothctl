# Harald

A node wrapper for bluetoothctl

Installation
------------

    npm install @sieem/harald

Usage
-----

```js
const { Harald, BluetoothEvent } = require('@sieem/harald');
const harald = new Harald();

// Available events
harald.on(BluetoothEvent.Connected, ({ device, event }) => {
  console.log(event); // 'connected'
  console.log(device); // { macAddress: '00:00:00:00:00:00', name: 'Pocophone F1' }
});

harald.on(BluetoothEvent.Paired, ({ device, event }) => {
  console.log(event); // 'paired'
  console.log(device); // { macAddress: '00:00:00:00:00:00', name: 'Pocophone F1' }
});

harald.on(BluetoothEvent.Disconnected, ({ device, event }) => {
  console.log(event); // 'disconnected'
  console.log(device); // { macAddress: '00:00:00:00:00:00', name: 'Pocophone F1' }
});

// Available actions
harald.actions.agent(start: boolean)
harald.actions.power(start: boolean)
harald.actions.scan(startScan: boolean)
harald.actions.pairable(canPairable: boolean)
harald.actions.discoverable(canDiscoverable: boolean)
harald.actions.pair(input: macAddress || name)
harald.actions.trust(input: macAddress || name)
harald.actions.untrust(input: macAddress || name)
harald.actions.block(input: macAddress || name)
harald.actions.unblock(input: macAddress || name)
harald.actions.connect(input: macAddress || name)
harald.actions.disconnect(input: macAddress || name)
harald.actions.remove(input: macAddress || name)
harald.actions.info(input: macAddress || name): {macAddress, name, paired, connected, ...}
harald.actions.getPairedDevices(): [{ macAddress: '00:00:00:00:00:00', name: 'Pocophone F1' }]
harald.actions.getDevices(): [{ macAddress: '00:00:00:00:00:00', name: 'Pocophone F1' }]
harald.actions.getConnectedDevices(): [{ macAddress: '00:00:00:00:00:00', name: 'Pocophone F1' }]
```

