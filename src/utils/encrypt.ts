import * as bcrypt from 'bcrypt';

const encrypt = async(value) => {
  return await bcrypt.hash(value, 10);
};

export default encrypt;
