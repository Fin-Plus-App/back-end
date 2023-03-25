import api from './api';

export async function saveDashboardFavorites(body, token) {
  console.log(body);
  const response = await api.post('/dashboard/favorites', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getDashboardFavoritest(token) {
  const response = await api.get('/dashboard/favorites', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
