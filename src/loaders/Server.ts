import { Express, Request, Response, NextFunction } from 'express';
import express from 'express';
import routes from '../api';
import logger from './Logger';
import config from '../config';
import cors from 'cors';
import mongoose from 'mongoose';

const path = require('path');
//import { Mongodb } from '../model/Mongo';
mongoose.connect('mongodb://localhost/phitest');
const passport = require('passport');
//const session = require('express-session');

import { NotFoundError, ApiError, InternalError } from '../core/APIerror';

export class Server {
  //console.log('Routes initialize1.');
  public static instance: Server;
  //console.log('Routes initialize2.');
  
  public static getInstance(
    app: Express,
    mongodb: null
  ) {
    //console.log('Get Instance');
    if (Server.instance === undefined || Server.instance === null) {
      Server.instance = new Server(
        app,
        mongodb
      );
    }
    return Server.instance;
  }

  private constructor(
    public app: Express,
    public mongodb: null
  ) { }

  public async start() {
    try {
      //console.log('Welcome');
      //logger.info('Routes initialize.');
      const corsOptions = {
        origin: '*',
        credentials: true,            //access-control-allow-credentials:true
        optionSuccessStatus: 200,
      };
      this.app.use(cors(corsOptions));
      this.app.options('*', cors());
      this.app.use(cors(corsOptions));
      this.app.use(express.static('./src/assets_playground'));
      this.app.use(express.static('./src/assets_playground/'));

      this.app.use(passport.initialize());

      this.app.use(express.json());

      this.app.use(express.urlencoded({
        extended: true
      }));

      this.app.use(config.api.prefix, routes());
      //logger.info('Routes initialize.');
      //logger.info('Port.',config.port);
      this.app.listen(config.port, () => {
        logger.info('******Server listening on PORT: ' + config.port + '******');
      });
      //logger.info('here.');
      this.app.use((req, res, next) => next(new NotFoundError()));

      this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ApiError) {
          ApiError.handle(err, res);
        } else {
          if (process.env.NODE_ENV === 'development') {
            logger.error(err);
            return res.status(500).send(err.message);
          }
          logger.info(err);
          ApiError.handle(new InternalError('internal error...'), res);
        }
      });

    } catch (error) {
      logger.error('Server error occured in server.start ' + error);
    }
  }
  private uniqueId(req: Request, res: Response, next: NextFunction) {

    next();
  }
}