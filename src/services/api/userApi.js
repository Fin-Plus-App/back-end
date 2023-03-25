import api from './api';

export async function signUp(body) {
  const response = await api.post('/user', body);
  return response.data;
}
