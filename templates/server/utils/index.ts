import { Request as RQ, Response as RS, NextFunction } from 'express-serve-static-core';
import {v4} from 'uuid';

/** Required Types for Express.TS */
export type Request = RQ;
export type Response = RS;
export type Next = NextFunction;


/** Utility functions */
export const SUCCESS = {status: true, statusCode: 200};
export const uuid = v4;
