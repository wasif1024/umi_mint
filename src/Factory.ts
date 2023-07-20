import express from 'express';
import Logger from './loaders/Logger';
import { Server } from './loaders/Server';
//import { Mongodb } from './model/Mongo';

export class Factory {
  public static InitializeServer(): Server {
    try {
      console.log('InitializeServer');

      Logger.info('index.InitializeServer');
      const app = express();
      console.log('Initialize App');
      //const mongodb = new Mongodb();
      const mongodb: any = null;
      return Server.getInstance(
        app,
        mongodb,
      );
    } catch (error) {
      Logger.error('Error occured in factory while initializing server ' + error);
    }
  }
}