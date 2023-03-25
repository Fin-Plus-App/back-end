import brapiApi from './brapiApi';

export async function findTicker(params) {
  const response = await brapiApi.get(`/api/available?search=${params}`);

  return response.data.stocks;
}
