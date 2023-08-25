import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class UserService {

  APIEndpoint = 'http://localhost:7777/api/v1/customers';

  async create(email, password) {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
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

  //todo WIP
  async update(userData) {
    console.log('userData dans le user services: ', userData);

    const requestOptions = {
      method: 'PATCH',
      headers: getAuthorizationHeader(),
      body: JSON.stringify(userData)
    };
    console.log('requestOptions:', requestOptions);

    try {
      const response = await fetch(`${this.APIEndpoint}/profile/${userData.id}`, requestOptions)
      console.log('response:', response);

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.message || 'Une erreur est survenue lors de la création du compte, veuillez ressayer';

        return errorMessage;
      }
      const data = await response.json();
      console.log('data:', data);
      return data;

    } catch (err) {
      console.error(err.message);
    }
  }
}