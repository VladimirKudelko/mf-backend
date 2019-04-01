import mongoose from '../context';
import { RoleEnum } from '../enums';
import { Task } from '.';

export interface UserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdDate: Date;
  tasks: Task[];
  role?: RoleEnum;
  encryptPassword(password: string): void;
  validatePassword(password: string): boolean;
  generateJWT(): string;
}
