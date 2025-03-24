"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQRCode = getQRCode;
exports.getIDCard = getIDCard;
exports.getDeviceInfo = getDeviceInfo;
exports.getBatteryInfo = getBatteryInfo;
require("server-only");
const dayjs_1 = __importDefault(require("dayjs"));
const VISION_URL = process.env.VISION_URL;
const VISION_TOKEN = process.env.VISION_TOKEN;
if (!VISION_URL)
    throw new Error("VISION_URL is not defined");
if (!VISION_TOKEN)
    throw new Error("VISION_TOKEN is not defined");
async function fetchAPI(url, options) {
    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${VISION_TOKEN}`,
        },
    });
    if (response.ok)
        return (await response.json());
    return null;
}
async function getQRCode(file) {
    const formData = new FormData();
    formData.append("file", file);
    return (await fetchAPI(`${VISION_URL}/qr-decode`, {
        method: "POST",
        body: formData,
    }));
}
async function getIDCard(file) {
    const formData = new FormData();
    formData.append("file", file);
    const data = (await fetchAPI(`${VISION_URL}/idcard-decode`, {
        method: "POST",
        body: formData,
    }));
    if (data) {
        return {
            idNumber: data.id_number,
            fullName: data.full_name,
            address: data.address,
            dateOfBirth: (0, dayjs_1.default)(data.date_of_birth).toDate(),
            expiredDate: (0, dayjs_1.default)(data.expired_date).toDate(),
        };
    }
    return null;
}
async function getDeviceInfo(file) {
    const formData = new FormData();
    formData.append("file", file);
    const data = (await fetchAPI(`${VISION_URL}/device-info-decode`, {
        method: "POST",
        body: formData,
    }));
    if (data) {
        return {
            modelName: data.model_name,
            serialNumber: data.serial_number,
            imei: data.imei,
            imei2: data.imei2,
            eid: data.eid,
            color: data.color,
            capacity: data.capacity,
        };
    }
    return null;
}
async function getBatteryInfo(file) {
    const formData = new FormData();
    formData.append("file", file);
    const data = (await fetchAPI(`${VISION_URL}/battery-info-decode`, {
        method: "POST",
        body: formData,
    }));
    if (data) {
        return { maximumCapacity: data.maximum_capacity };
    }
    return null;
}
