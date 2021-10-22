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
  console.log(device); // { macAddress: '00:00:00:00:00:00', deviceName: 'Pocophone F1' }
});

harald.on(BluetoothEvent.Paired, ({ device, event }) => {
  console.log(event); // 'paired'
  console.log(device); // { macAddress: '00:00:00:00:00:00', deviceName: 'Pocophone F1' }
});

harald.on(BluetoothEvent.Disconnected, ({ device, event }) => {
  console.log(event); // 'disconnected'
  console.log(device); // { macAddress: '00:00:00:00:00:00', deviceName: 'Pocophone F1' }
});

// Available actions
harald.actions.agent(start: boolean)
harald.actions.power(start: boolean)
harald.actions.scan(startScan: boolean)
harald.actions.pairable(canPairable: boolean)
harald.actions.discoverable(canDiscoverable: boolean)
harald.actions.pair(input: macAddress || deviceName)
harald.actions.trust(input: macAddress || deviceName)
harald.actions.untrust(input: macAddress || deviceName)
harald.actions.block(input: macAddress || deviceName)
harald.actions.unblock(input: macAddress || deviceName)
harald.actions.connect(input: macAddress || deviceName)
harald.actions.disconnect(input: macAddress || deviceName)
harald.actions.remove(input: macAddress || deviceName)
harald.actions.info(input: macAddress || deviceName): {macAddress, Name, Paired, Connected, ...}
harald.actions.getPairedDevices(): [{ macAddress: '00:00:00:00:00:00', deviceName: 'Pocophone F1' }]
harald.actions.getDevices(): [{ macAddress: '00:00:00:00:00:00', deviceName: 'Pocophone F1' }]
```

