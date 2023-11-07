import { User } from './schema';

export const getUser = async (id: string) => {
  return User.findOne({ _id: id });
};
