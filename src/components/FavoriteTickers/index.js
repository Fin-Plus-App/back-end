import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDashboardFavorites from '../../hooks/api/useDashboardFavorites';
import AddFavoriteTicker from './AddFavoriteTicker';
import FavoriteTicker from './FavoriteTicker';
import useTickersData from '../../hooks/brapiApi/useTickersData';

export default function FavoriteTickers() {
  const { dashboardFavorites } = useDashboardFavorites();
  const [tickers, setTickers] = useState();
  const [favoriteTickers, setFavoriteTickers] = useState();
  const { getTickersData } = useTickersData();

  useEffect(() => {
    if (dashboardFavorites) {
      setTickers(dashboardFavorites);
    }
  }, [dashboardFavorites]);

  useEffect(() => {
    if (tickers) {
      const tickersList = [];
      tickers.forEach((favorite) => {
        return tickersList.push(favorite.ticker);
      });

      const params = tickersList.join('%2C');

      getFavoriteTickersData(params);
      setInterval(() => {
        getFavoriteTickersData(params);
      }, 60000);
    }
  }, [tickers]);

  async function getFavoriteTickersData(params) {
    try {
      const result = await getTickersData(params);
      const updatedTickers = result.map((ticker) => {
        const favorite = tickers.find((fav) => fav.ticker === ticker.symbol);
        return {
          ...ticker,
          id: favorite.id,
        };
      });

      setFavoriteTickers(updatedTickers);
    } catch (error) {
      console.log(error);
    }
  }

  if (!tickers || !favoriteTickers) {
    return <></>;
  }

  return (
    <FavoriteTickersContainer>
      <AddFavoriteTicker setTickers={setTickers} />
      {favoriteTickers.map((ticker, index) => {
        return <FavoriteTicker ticker={ticker} setTickers={setTickers} key={index} />;
      })}
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
