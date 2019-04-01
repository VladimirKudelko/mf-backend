import { User } from '../schemas';
import { UserDocument } from '../../models';

const create = async(data: UserDocument) => {
  const user = await new User(data);

  await user.encryptPassword(data.password);

  return user.save();
};

const getById = (userId: string) => User.findById(userId);

const getByEmail = (email: string) => User.findOne({ email });

const updateById = (userId: string, data: UserDocument | any) =>
  User.findOneAndUpdate({ _id: userId }, data, { new: true });

export default {
  create,
  getByEmail,
  getById,
  updateById
};
