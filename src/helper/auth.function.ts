import * as bcrypt from 'bcrypt';

export const _generatePasswordForDb = async (password: string) => {
  return bcrypt.hash(password, 6);
};
