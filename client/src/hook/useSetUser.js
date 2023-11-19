import { UserService } from '../services/user.services';

const User = new UserService();

export const useSetupUser = () => {

  const create = async (email, password) => {
    const newUser = await User.create(email, password);
    if (newUser) {
      return newUser;
    }
  }

  const update = async (userData) => {
    const userUpdated = await User.update(userData);
    if (userUpdated) return userUpdated;

  }

  const deleted = async (userData) => {
    const userDeleted = await User.delete(userData);
    if (userDeleted) return userDeleted;
  }

  return { create, update, deleted }
}