import { BatteryInfo, DeviceInfo, IDCard, QRCODE } from "./types";
export declare function getQRCode(file: File): Promise<QRCODE | null>;
export declare function getIDCard(file: File): Promise<IDCard | null>;
export declare function getDeviceInfo(file: File): Promise<DeviceInfo | null>;
export declare function getBatteryInfo(file: File): Promise<BatteryInfo | null>;
