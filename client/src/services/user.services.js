import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
// const localEndoint = process.env.NEXT_PUBLIC_ENDPOINT_PRODUCTION

export class UserService {

  APIEndpoint = `${endpoint}/customers`;

  async create(email, password) {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        role: "member"
      }),
    }

    try {

      const response = await fetch(`${this.APIEndpoint}/signup`, requestOptions)

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.message || 'Une erreur est survenue lors de la création du compte, veuillez ressayer';
        return errorMessage;
      }

      const data = await response.json();
      return data
    } catch (err) {
      console.error(err.message);
    }
  }

  async update(userData) {
    console.log('userData dans le user services: ', userData);

    const requestOptions = {
      method: 'PATCH',
      headers: getAuthorizationHeader(),
      body: JSON.stringify(userData)
    };

    try {
      const response = await fetch(`${this.APIEndpoint}/profile/${userData.id}`, requestOptions)

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.message || 'Une erreur est survenue lors de la création du compte, veuillez ressayer';

        return errorMessage;
      }
      const data = await response.json();
      return data;

    } catch (err) {
      console.error(err.message);
    }
  }

  async delete(userData) {
    const requestOptions = {
      method: 'DELETE',
      headers: getAuthorizationHeader(),
      body: JSON.stringify(userData)
    };
    try {
      const response = await fetch(`${this.APIEndpoint}/profile/${userData.id}`, requestOptions)
      ('response:', response);

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.message || 'Une erreur est survenue lors de la suppression du compte, veuillez ressayer';

        return errorMessage;
      }
      const data = await response.json();
      return data;

    } catch (err) {
      console.error(err.message);
    }
  }

  async resetPassword(email) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      }),
    }
    try {
      const response = await fetch(`${this.APIEndpoint}/profile/reset/${userData.id}`, requestOptions)

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.message || 'Une erreur est survenue lors de la suppression du compte, veuillez ressayer';

        return errorMessage;
      }
      const data = await response.json();
      return data;

    } catch (err) {
      console.error(err.message);
    }

  }
}