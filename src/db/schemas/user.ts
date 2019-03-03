import * as bcrypt from 'bcrypt';

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
    required: true
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

export default mongoose.model<IUser>('user', userSchema);
