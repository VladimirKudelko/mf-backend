import { User } from '../schemas';

const create = async(data) => {
  const user = await new User(data);

  await user.encryptPassword(data.password);

  return user.save();
};

const findByEmail = (email: string) => User.findOne({ email });

export default {
  create,
  findByEmail
};
