import { UserService } from '../services/user.services';

const User = new UserService();

export const useCreate = () => {

  const create = async (email, password) => {
    const newUser = await User.create(email, password);
    if (newUser) {
      return newUser;
    }
  }
  return { create };
}