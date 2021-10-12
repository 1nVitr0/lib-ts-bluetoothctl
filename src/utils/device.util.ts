import { HaraldDevice } from "../interfaces/HaraldDevice.interface";

const macAddressRegexString = '(?<macAddress>[a-fA-F0-9]{2}(?:\:[a-fA-F0-9]{2}){5})';

export const extractMacAddress = (str: string): string => {
  const macAddress = new RegExp(macAddressRegexString).exec(str)?.groups?.macAddress;

  if (!macAddress) {
    throw `mac address not found, tried to search in '${str}'`;
  }

  return macAddress;
};
export const extractDeviceName = (str: string): string => {
  const deviceName = new RegExp(`${macAddressRegexString} (?<device>[^\r\n]*)`).exec(str)?.groups?.device;

  if (!deviceName) {
    throw `couldn't extract device name, tried to find it in '${str}'`;
  }

  return deviceName;
};
export const isMacAddress = (str: string): boolean => new RegExp(macAddressRegexString).test(str);
export const isNewDevice = (str: string): boolean => /\[NEW\] Device/.test(str);
export const extractDevicesFromString = (str: string): HaraldDevice[] => str
  .trim()
  .split('\n')
  .map((line) => ({
    macAddress: extractMacAddress(line),
    deviceName: extractDeviceName(line),
  }))