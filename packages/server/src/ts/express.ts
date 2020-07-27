import { Request as req, Response as res, NextFunction } from 'express';
import { User } from '../models/User';

export interface Request extends req {
  userId?: number;
  user?: User;
}

export type Response = res;

export { NextFunction };
