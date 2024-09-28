import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPass = async (pass: string) => {
  return await bcrypt.hash(pass, saltRounds);
};

export const validatePass = async (pass: string, hashedPass: string) => {
  return await bcrypt.compare(pass, hashedPass);
};
