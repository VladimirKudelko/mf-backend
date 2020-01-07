import mongoose from '../context';
import { RoleEnum } from '../enums';
import { Task } from '.';

export interface UserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  hash: string;
  password: string;
  createdDate: Date;
  tasks: Task[];
  budget: {
    allExpenses: string,
    category: Object
  };
  role?: RoleEnum;
  encryptPassword(password: string): void;
  validatePassword(password: string): boolean;
  generateJWT(): string;
}
