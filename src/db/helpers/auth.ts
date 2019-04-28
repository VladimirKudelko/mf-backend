import { User } from '../schemas';
import { UserDocument } from '../../models';

const create = async(data: UserDocument) => {
  const user = await new User(data);

  await user.encryptPassword(data.password);

  return user.save();
};

const getAll = () => User.find();

const getAllWithoutCurrentUser = (id: string) => User.find({ _id: { $ne: id } });

const getById = (userId: string) => User.findById(userId);

const getByEmail = (email: string) => User.findOne({ email });

const updateById = (userId: string, data: UserDocument | any) =>
  User.findOneAndUpdate({ _id: userId }, data, { new: true });

const deleteById = (id: string) => User.findByIdAndDelete(id);

export default {
  create,
  deleteById,
  getAll,
  getAllWithoutCurrentUser,
  getByEmail,
  getById,
  updateById
};
