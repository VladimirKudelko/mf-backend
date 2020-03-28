import { ObjectID } from 'mongodb';

import mongoose from '../context';

import { RoleEnum } from '../enums';
import { Task } from '.';

export interface UserDocument extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  hash: string;
  password: string;
  createdDate: Date;
  currency: string;
  tasks: Task[];
  budgets: ObjectID[];
  role?: RoleEnum;
  encryptPassword(password: string): void;
  validatePassword(password: string): boolean;
  generateJWT(): string;
}
