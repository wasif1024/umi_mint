import { Factory } from './Factory';
import Logger from './loaders/Logger';

async function startServer() {
  try {
    console.log('start server');
    Logger.info('Init');
console.log('init');
    const server = Factory.InitializeServer();
    console.log('start');
    server.start();
  } catch (error) {
    console.log('error');
    Logger.error('Error occured in app file :' + error);
  }
  

}

startServer();