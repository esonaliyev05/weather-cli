import os from 'os';
import path from 'path';
import fs from 'fs';

const filePath = path.join(os.homedir(), 'weather-data.json');

export const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city'
};

const isExist = async (path) => {
  try {
    await fs.promises.stat(path);
    return true;
  } catch {
    return false;
  }
};

export const saveKeyValue = async (key, value) => {
  let data = {};

  if (await isExist(filePath)) {
    const file = await fs.promises.readFile(filePath, 'utf-8');
    data = JSON.parse(file);
  }

  data[key] = value;
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
};

export const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await fs.promises.readFile(filePath, 'utf-8');
    const data = JSON.parse(file);
    return data[key];
  }
};
