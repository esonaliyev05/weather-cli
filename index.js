import getArgs from './helpers/args.js';
import logService from './service/log.service.js';
import { saveKeyValue } from './service/storage.service.js';

const saveToken = async token => {
    await saveKeyValue('token' , token)

    try{
        await saveKeyValue('token' , token)
        printSuccess("Token was saved")

    }catch (error){
         printError(error.massage)
    }
}

const startCLI = () => {
    const args = getArgs(process.argv);
    console.log(args);

    if (args.h) {
        printHelp();
    }
    if (args.s) {
        printSuccess(`City saved: ${args.s}`);
    }
    if (args.t) {
        saveKeyValue("token" , args.t)
    }
}

startCLI();
