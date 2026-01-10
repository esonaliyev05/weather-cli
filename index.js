import getArgs from './helpers/args.js';
import { getWeather } from './service/api.service.js';
import logService from './service/log.service.js';
import {
  saveKeyValue,
  TOKEN_DICTIONARY,
  getKeyValue
} from './service/storage.service.js';

const { printError, printSuccess, printHelp } = logService;

// TOKEN saqlash
const saveToken = async (token) => {
  if (!token || !token.length) {
    return printError("Token doesn't exist");
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Token was saved");
  } catch (error) {
    printError(error.message);
  }
};

// CITY saqlash
const saveCity = async (city) => {
  if (!city || !city.length) {
    return printError("City doesn't exist");
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("City was saved");
  } catch (error) {
    printError(error.message);
  }
};

// WEATHER olish
const getForcast = async () => {
  try {
    const city = 
      process.env.CITY ??
      await getKeyValue(TOKEN_DICTIONARY.city) ??
      'Uzbekistan';

    const response = await getWeather(city);
    console.log(response);
  } catch (error) {
    if (error?.response?.status === 404) {
      printError('City not found');
    } else if (error?.response?.status === 401) {
      printError('Invalid token');
    } else {
      printError(error.message);
    }
  }
};

// CLI start
const startCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }

  return getForcast();
};

startCLI();
