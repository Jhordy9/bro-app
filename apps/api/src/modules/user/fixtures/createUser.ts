import User, { IUser } from '../UserModel';

export const createUser = (
  args: Pick<IUser, 'name' | 'email' | 'password'>
) => {
  return new User({
    ...args,
  }).save();
};
