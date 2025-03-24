export type IDCard = {
    idNumber: string;
    fullName: string;
    address: string;
    dateOfBirth: Date;
    expiredDate: Date;
};
export type DeviceInfo = {
    modelName: string;
    serialNumber: string;
    imei: string;
    imei2: string;
    eid: string;
    color: string;
    capacity: string;
};
export type QRCODE = {
    payload: string;
};
export type BatteryInfo = {
    maximumCapacity: number;
};
