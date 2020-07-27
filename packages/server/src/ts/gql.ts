import { User } from '../models/User';
import { Request, Response } from './express';

export interface GQLCtx {
  user?: User;
  res: Response;
  req: Request;
}
