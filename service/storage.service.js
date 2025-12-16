import os from "os";
import path from "path";
import fs from "fs";

// Fayl yo'li
const filePath = path.join(os.homedir(), "weather-data.json");

// Token va city uchun lug'at
export const TOKEN_DICTIONARY = {
  token: "token",
  city: "city"
};

// Fayl mavjudligini tekshiruvchi funksiya
const isExist = async (path) => {
  try {
    await fs.promises.stat(path);
    return true;
  } catch {
    return false;
  }
};

// Kalit-qiymatni saqlash funksiyasi
export const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExist(filePath)) {
    const file = await fs.promises.readFile(filePath, "utf-8");
    data = JSON.parse(file);
  }

  data[key] = value;
  await fs.promises.writeFile(filePath, JSON.stringify(data));
};

// Kalit bo'yicha qiymatni olish funksiyasi
export const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(file);
    return data[key];
  }
};
