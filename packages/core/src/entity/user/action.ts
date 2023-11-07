import { User as UserInterface } from '../../interfaces/user.interface';
import { User } from './schema';

export const createUser = async (data: UserInterface) => {
  return User.create(data);
};
export const updateUser = async (id: string, data: Partial<UserInterface>) => {
  return User.findByIdAndUpdate({ _id: id }, data);
};
