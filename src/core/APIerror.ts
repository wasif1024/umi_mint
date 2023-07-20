import { Response } from 'express';
// import  dotenv  from 'dotenv';

import {
    AuthFailureResponse,
    InternalErrorResponse,
    NotFoundResponse,
    BadRequestResponse,
    ForbiddenResponse,
    FailureMsgResponse,
  } from './APIresponse';

  enum ErrorType {
    BAD_TOKEN = 'BadTokenError',
    TOKEN_EXPIRED = 'TokenExpiredError',
    UNAUTHORIZED = 'AuthFailureError',
    INTERNAL = 'InternalError',
    NOT_FOUND = 'NotFoundError',
    NO_ENTRY = 'NoEntryError',
    NO_DATA = 'NoDataError',
    BAD_REQUEST = 'BadRequestError',
    FORBIDDEN = 'ForbiddenError',
  }
  /* tslint:disable:max-classes-per-file */
  export abstract class ApiError extends Error {
    constructor(public type: ErrorType, public message: string = 'error') {
      super(type);
    }

    public static handle(err: ApiError, res: Response): Response {
      switch (err.type) {
        case ErrorType.BAD_TOKEN:
        case ErrorType.TOKEN_EXPIRED:
        case ErrorType.UNAUTHORIZED:
          return new AuthFailureResponse(err.message).send(res);
        case ErrorType.INTERNAL:
          return new InternalErrorResponse(err.message).send(res);
        case ErrorType.NOT_FOUND:
        case ErrorType.NO_ENTRY:
          return new FailureMsgResponse(err.message).send(res);
        case ErrorType.NO_DATA:
          return new NotFoundResponse(err.message).send(res);
        case ErrorType.BAD_REQUEST:
          return new BadRequestResponse(err.message).send(res);
        case ErrorType.FORBIDDEN:
          return new ForbiddenResponse(err.message).send(res);
        default: {
          let message = err.message;
          // Do not send failure message in production as it may send sensitive data
          if (process.env.NODE_ENV === 'production') message = 'Something wrong happened.';
          return new InternalErrorResponse(message).send(res);
        }
      }
    }
  }

  export class InternalError extends ApiError {
    constructor(message = 'Internal error') {
      super(ErrorType.INTERNAL, message);
    }
  }

  export class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
      super(ErrorType.BAD_REQUEST, message);
    }
  }

  export class BadTokenError extends ApiError {
    constructor(message = 'Token is not valid') {
      super(ErrorType.UNAUTHORIZED, message);
    }
  }

  export class NotFoundError extends ApiError {
    constructor(message = 'Not Found') {
      super(ErrorType.NOT_FOUND, message);
    }
  }

  export class ForbiddenError extends ApiError {
    constructor(message = 'Permission denied') {
      super(ErrorType.FORBIDDEN, message);
    }
  }

  export class NoEntryError extends ApiError {
    constructor(message = "Entry don't exists") {
      super(ErrorType.NO_ENTRY, message);
    }
  }

  export class NoDataError extends ApiError {
    constructor(message = 'No data available') {
      super(ErrorType.NO_DATA, message);
    }
  }

  export class TokenExpiredError extends ApiError {
    constructor(message = 'Token is expired') {
      super(ErrorType.TOKEN_EXPIRED, message);
    }
  }