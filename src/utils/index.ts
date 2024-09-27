import { User } from 'src/users/entities/user.entity';

const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPass = async (pass: string) => {
  return await bcrypt.hash(pass, saltRounds);
};

export const validatePass = async (pass: string, hashedPass: string) => {
  return await bcrypt.compare(pass, hashedPass);
};

export const excludePass = (data: User[]) =>
  data.map(({ password, ...rest }) => rest);
