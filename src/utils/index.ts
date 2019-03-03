import * as bcrypt from 'bcrypt';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';

import { IUser } from '../models';

export const asyncForEach = async(array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const encrypt = async(value) => await bcrypt.hash(value, 10);

export const generateJWT = (user: IUser) => {
  return `bearer ${ jwt.sign(user.toJSON(), config.get('secretKey'), { expiresIn: 86400000 }) }`;
};
