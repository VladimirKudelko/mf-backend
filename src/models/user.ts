import mongoose from '../context';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  encryptPassword(password: string): void;
  validatePassword(password: string): boolean;
  generateJWT(): string;
}
