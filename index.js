import getArgs from './helpers/args.js';
import logService from './service/log.service.js';

const { printError, printSuccess, printHelp } = logService;

const startCLI = () => {
    const args = getArgs(process.argv);

    if (args.h) {
        printHelp();
    }
    if (args.s) {
        printSuccess(`City saved: ${args.s}`);
    }
    if (args.t) {
        printSuccess(`Token saved: ${args.t}`);
    }
}

startCLI();
