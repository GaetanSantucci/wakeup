export class UserService {

  APIEndpoint = 'http://localhost:5555/api/v1/customers';

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
      console.log('response: ', response);

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.message || 'Une erreur est survenue lors de la création du compte, veuillez ressayer';
        console.log('errorMessage: ', errorMessage);
        return errorMessage;
      }

      const data = await response.json();
      console.log('data: ', data);
      return data
    } catch (err) {
      console.error(err.message);
    }
  }

  //todo WIP
  async update(userData) {

    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    };

    try {
      const response = await fetch(`${this.APIEndpoint}/profile/${userData.id}`, requestOptions)
      console.log('response: ', response);

      if (!response.ok) {
        const data = await response.json();
        const errorMessage = data.message || 'Une erreur est survenue lors de la création du compte, veuillez ressayer';
        console.log('errorMessage: ', errorMessage);
        return errorMessage;
      }
      // const data = await response.json();
      // return data;

    } catch (err) {
      console.error(err.message);
    }
  }
}