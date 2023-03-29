import { UserService } from '../services/user.services';

const User = new UserService();

export const useCreate = () => {

  const create = async (email, password) => {
    console.log('password: ', password);
    console.log('email: ', email);
    const newUser = await User.create(email, password);
    console.log('newUser: ', newUser);
    if (newUser) {
      console.log('newUser: ', newUser);
      return newUser;
    }
  }
  return { create };
}