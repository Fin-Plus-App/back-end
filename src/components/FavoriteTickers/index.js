import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDashboardFavorites from '../../hooks/api/useDashboardFavorites';
import AddFavoriteTicker from './AddFavoriteTicker';
import FavoriteTicker from './FavoriteTicker';

export default function FavoriteTickers() {
  const { dashboardFavorites } = useDashboardFavorites();
  const [tickers, setTickers] = useState();

  useEffect(() => {
    if (dashboardFavorites) {
      setTickers(dashboardFavorites);
    }
  }, [dashboardFavorites]);

  return (
    <FavoriteTickersContainer>
      <AddFavoriteTicker setTickers={setTickers} />
      <FavoriteTicker tickers={tickers} setTickers={setTickers} />
    </FavoriteTickersContainer>
  );
}

const FavoriteTickersContainer = styled.div`
  display: flex;
  min-height: 15rem;
  flex-direction: column;
  align-items: center;
  border: 2px solid #cecece;
  border-radius: 0.5rem;
  margin: 1rem;
  overflow-y: hidden;
`;
