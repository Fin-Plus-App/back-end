import { useEffect, useState } from 'react';
import useDashboardFavorites from '../../hooks/api/useDashboardFavorites';
import useTickersData from '../../hooks/brapiApi/useTickersData';

export default function FavoriteTicker() {
  const [favoriteTickers, setFavoriteTickers] = useState();
  const { dashboardFavorites } = useDashboardFavorites();
  const { getTickersData } = useTickersData();
  
  useEffect(() => {
    if (dashboardFavorites !== null) {
      const tickers = [];
      dashboardFavorites.forEach((favorite) => {
        return tickers.push(favorite.ticker);
      });

      const params = tickers.join('%2C');

      getFavoriteTickersData(params);
    }
  }, [dashboardFavorites]);

  async function getFavoriteTickersData(params) {
    try {
      const result = await getTickersData(params);
      setFavoriteTickers(result);
    } catch (error) {
      console.log(error);
    }
  }
  if (!favoriteTickers) {
    return <></>;
  }

  return (
    <>
      {favoriteTickers.map((ticker, index) => {
        return (
          <div key={index}>
            <img src={ticker.logourl} />
            <p>{ticker.symbol}</p>
            <p>{ticker.regularMarketPrice}</p>
            <p>{ticker.regularMarketChangePercent}</p>
          </div>
        );
      })}
    </>
  );
}
