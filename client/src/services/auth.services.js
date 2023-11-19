import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";


export class AuthService {

  APIEndpoint = `${process.env.NEXT_PUBLIC_ENDPOINT_LOCAL_TEST}/customers`;

  // method to fetch user and get token to validate access to profile page
  async login(email, password) {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      }),
    }

    try {

      const response = await fetch(`${this.APIEndpoint}/signin`, requestOptions);

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.message || 'Une erreur est survenue lors de la connexion, veuillez ressayer';
        return { errorMessage };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // method to fetch user profile by id
  async getMe(userId) {
    const requestOptions = {
      method: 'GET',
      headers: getAuthorizationHeader(),
    };

    try {

      const response = await fetch(`${this.APIEndpoint}/profile/${userId}`, requestOptions)
      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.message || 'Une erreur est survenue lors de la connexion, veuillez ressayer';
        return { errorMessage };
      }

      const data = await response.json();
      return data;

    } catch (err) {
      console.error(err.message);
    }
  }
}

