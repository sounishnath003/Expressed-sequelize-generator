import createHttpError from "http-errors";
import {
  Request as RQ,
  Response as RS,
  NextFunction,
} from "express-serve-static-core";
import { v4 } from "uuid";

/** Required Types for Express.TS */
export type Request = RQ;
export type Response = RS;
export type Next = NextFunction;
export const createError = createHttpError;


/** Utility functions */
export const SUCCESS = { status: true, statusCode: 200 };
export const uuid = v4;
