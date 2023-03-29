import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class AuthService {

  APIEndpoint = 'http://localhost:5555/api/v1/customers';

  async login(email, password) {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    }
    try {
      const response = await fetch(`${this.APIEndpoint}/signin`, requestOptions);
      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.message || 'Une erreur est survenue lors de la connexion, veuillez ressayer';
        console.log('errorMessage: ', errorMessage);
        return errorMessage;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };


  async getUser(userId) {
    const requestOptions = {
      method: 'GET',
      headers: getAuthorizationHeader(),
    };

    try {
      const response = await fetch(`${this.APIEndpoint}/user/${id}`, requestOptions)
    } catch (error) {
      console.error(error);
    }
  }
}

