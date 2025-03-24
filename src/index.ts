import "server-only";

import dayjs from "dayjs";
import { BatteryInfo, DeviceInfo, IDCard, QRCODE } from "./types";

const VISION_URL = process.env.VISION_URL;
const VISION_TOKEN = process.env.VISION_TOKEN;

async function fetchAPI(url: string, options: RequestInit) {
  if (!VISION_URL) throw new Error("VISION_URL is not defined");

  if (!VISION_TOKEN) throw new Error("VISION_TOKEN is not defined");

  const response = await fetch(`${VISION_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${VISION_TOKEN}`,
    },
  });

  if (response.ok) return (await response.json()) as unknown;

  return null;
}

export async function getQRCode(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return (await fetchAPI("/qr-decode", {
    method: "POST",
    body: formData,
  })) as QRCODE | null;
}

export async function getIDCard(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const data = (await fetchAPI("/idcard-decode", {
    method: "POST",
    body: formData,
  })) as { [key: string]: string } | null;

  if (data) {
    return {
      idNumber: data.id_number,
      fullName: data.full_name,
      address: data.address,
      dateOfBirth: dayjs(data.date_of_birth).toDate(),
      expiredDate: dayjs(data.expired_date).toDate(),
    } as IDCard;
  }

  return null;
}

export async function getDeviceInfo(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const data = (await fetchAPI("/device-info-decode", {
    method: "POST",
    body: formData,
  })) as { [key: string]: string } | null;

  if (data) {
    return {
      modelName: data.model_name,
      serialNumber: data.serial_number,
      imei: data.imei,
      imei2: data.imei2,
      eid: data.eid,
      color: data.color,
      capacity: data.capacity,
    } as DeviceInfo;
  }

  return null;
}

export async function getBatteryInfo(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const data = (await fetchAPI("/battery-info-decode", {
    method: "POST",
    body: formData,
  })) as { maximum_capacity: number } | null;

  if (data) {
    return { maximumCapacity: data.maximum_capacity } as BatteryInfo;
  }

  return null;
}
