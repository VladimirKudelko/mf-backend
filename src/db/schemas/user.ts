import * as bcrypt from 'bcrypt';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';

import mongoose from '../../context';
import { IUser } from '../../models';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: String,
    default: false
  }
}, { versionKey: false });

userSchema.methods.encryptPassword = async function(password) {
  this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function() {
  return `bearer ${ jwt.sign(this.toObject(), config.get('secretKey'), { expiresIn: 86400000 }) }`;
};

export default mongoose.model<IUser>('user', userSchema);
