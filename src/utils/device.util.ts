import { HaraldDeviceMapping } from "../interfaces/HaraldDeviceMapping.interface";

const macAddressRegexString = '(?<macAddress>[a-fA-F0-9]{2}(?:\:[a-fA-F0-9]{2}){5})';

export const extractMacAddress = (str: string): string => {
  const macAddress = new RegExp(macAddressRegexString).exec(str)?.groups?.macAddress;

  if (!macAddress) {
    throw `mac address not found, tried to search in '${str}'`;
  }

  return macAddress;
};
export const extractDeviceName = (str: string): string => {
  const name = new RegExp(`${macAddressRegexString} (?<device>[^\r\n]*)`).exec(str)?.groups?.device;

  if (!name) {
    throw `couldn't extract device name, tried to find it in '${str}'`;
  }

  return name;
};
export const isMacAddress = (str: string): boolean => new RegExp(macAddressRegexString).test(str);
export const isNewDevice = (str: string): boolean => /\[NEW\] Device/.test(str);
export const extractDevicesFromString = (str: string): HaraldDeviceMapping[] =>
  str === '' // when there are no devices, you end up with an empty string
    ? []
    : str
      .trim()
      .split('\n')
      .map((line) => ({
        macAddress: extractMacAddress(line),
        name: extractDeviceName(line),
      }));

export const extractMacAddressesFromString = (str: string): string[] => 
  str === '' // when there are no devices, you end up with an empty string
    ? []
    : str
      .trim()
      .split('\n')
      .map((line) => extractMacAddress(line));
