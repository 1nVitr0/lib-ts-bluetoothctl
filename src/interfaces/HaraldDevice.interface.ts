export interface HaraldDevice {
  macAddress: string;     // 24:DA:9B:C6:82:AD
  name: string;           // Moto X 2014
  alias: string;          // Moto X 2014
  class: string;          // 0x005a020c
  icon: string;           // phone
  paired: boolean;        // yes
  trusted: boolean;       // no
  blocked: boolean;       // no
  connected: boolean;     // yes
  legacyPairing: boolean; // no
  uUID: string[];         // OBEX Object Push          (00001105-0000-1000-8000-00805f9b34fb)
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
  modalias: string;       // bluetooth:v00E0p1200d1436
}
