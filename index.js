import getArgs from './helpers/args.js';
import { getWeather } from './service/api.service.js';
import logService from './service/log.service.js';
import { saveKeyValue , TOKEN_DICTIONARY } from './service/storage.service.js';

const saveToken = async token => {
    await saveKeyValue('token' , token)
      
    if(!token.length) {
        printError(" Token Doesn't exist")
    }
    try{
        await saveKeyValue(TOKEN_DICTIONARY.token , token)
        printSuccess("Token was saved")

    }catch (error){
         printError(error.massage)
    }
}

const startCLI = () => {
    const args = getArgs(process.argv);
    console.log(process.env);


    if (args.h) {
        printHelp();
    }
    if (args.s) {

    }
    if (args.t) {
        saveKeyValue("token" , args.t)
    }
    getWeather( process.env.CITY ??  'uzbekistan')
}

startCLI();
