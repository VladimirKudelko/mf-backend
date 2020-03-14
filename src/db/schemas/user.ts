import * as bcrypt from 'bcrypt';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import * as uniqueValidator from 'mongoose-unique-validator';

import mongoose from '../../context';
import { UserDocument } from '../../models';
import { RoleEnum, CurrencyEnum } from '../../enums';
import { userTasks } from '../../constants/user-tasks';

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
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  hash: String,
  password: {
    type: String,
    required: true
  },
  createdDate: {
    type: mongoose.Schema.Types.Date,
    default: Date.now()
  },
  role: {
    type: String,
    default: RoleEnum.User,
    enum: [RoleEnum.User, RoleEnum.Admin]
  },
  tasks: {
    type: Array,
    default: userTasks
  },
  currency: {
    type: String,
    enum: [CurrencyEnum.AmericanDollar, CurrencyEnum.Euro, CurrencyEnum.BelarusianRuble, CurrencyEnum.RussianRuble],
    default: CurrencyEnum.AmericanDollar
  },
  budget: {
    type: {
      allExpenses: mongoose.Schema.Types.ObjectId,
      category: Object,
    },
    default: {
      allExpenses: null,
      category: null
    }
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

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

export default mongoose.model<UserDocument>('user', userSchema);
