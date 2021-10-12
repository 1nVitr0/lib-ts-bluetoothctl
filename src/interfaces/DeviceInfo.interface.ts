export interface DeviceInfo {
  macAddress?: string;     // 24:DA:9B:C6:82:AD
  Name: string;           // Moto X 2014
  Alias: string;          // Moto X 2014
  Class: string;          // 0x005a020c
  Icon: string;           // phone
  Paired: boolean;        // yes
  Trusted: boolean;       // no
  Blocked: boolean;       // no
  Connected: boolean;     // yes
  LegacyPairing: boolean; // no
  UUID: string[];         // OBEX Object Push          (00001105-0000-1000-8000-00805f9b34fb)
                          // Headset                   (00001108-0000-1000-8000-00805f9b34fb)
                          // Audio Source              (0000110a-0000-1000-8000-00805f9b34fb)
                          // A/V Remote Control Target (0000110c-0000-1000-8000-00805f9b34fb)
                          // Advanced Audio Distribu.. (0000110d-0000-1000-8000-00805f9b34fb)
                          // A/V Remote Control        (0000110e-0000-1000-8000-00805f9b34fb)
                          // Headset AG                (00001112-0000-1000-8000-00805f9b34fb)
                          // PANU                      (00001115-0000-1000-8000-00805f9b34fb)
                          // NAP                       (00001116-0000-1000-8000-00805f9b34fb)
                          // Handsfree Audio Gateway   (0000111f-0000-1000-8000-00805f9b34fb)
                          // Phonebook Access Server   (0000112f-0000-1000-8000-00805f9b34fb)
                          // Message Access Server     (00001132-0000-1000-8000-00805f9b34fb)
                          // PnP Information           (00001200-0000-1000-8000-00805f9b34fb)
                          // Generic Access Profile    (00001800-0000-1000-8000-00805f9b34fb)
                          // Generic Attribute Profile (00001801-0000-1000-8000-00805f9b34fb)
  Modalias: string;       // bluetooth:v00E0p1200d1436
}