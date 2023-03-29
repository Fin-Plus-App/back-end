import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDashboardFavorites from '../../hooks/api/useDashboardFavorites';
import useTickersData from '../../hooks/brapiApi/useTickersData';
import { RxTriangleDown, RxTriangleUp } from 'react-icons/rx';
import { BsFillTrash3Fill } from 'react-icons/bs';
import useDeleteDashBoardFavorite from '../../hooks/api/useDeleteDashboardFavorite';

export default function FavoriteTicker({ tickers, setTickers }) {
  const [favoriteTickers, setFavoriteTickers] = useState();
  const { getTickersData } = useTickersData();
  const { deleteDashBoardFavorite } = useDeleteDashBoardFavorite();
  const { getDashboardFavorites } = useDashboardFavorites();

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
      setFavoriteTickers(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTicker(ticker) {
    const deleteTicker = confirm('Deseja excluir ticker?');

    if (deleteTicker) {
      try {
        await deleteDashBoardFavorite(ticker);
        const result = await getDashboardFavorites();
        setTickers(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (!favoriteTickers) {
    return <></>;
  }

  function variationCollor(percent) {
    if (percent > 0) {
      return '#008000';
    } else if (percent < 0) {
      return '#ff0000';
    } else {
      return '#a9a9a9';
    }
  }

  return (
    <>
      {favoriteTickers.map((ticker, index) => {
        return (
          <TickerContainer key={index}>
            <TickerImage src={ticker.logourl} />
            {/*      <TickerName>{ticker.shortName}</TickerName> */}
            <Ticker>{ticker.symbol}</Ticker>
            <TickerPrice>
              <p>Valor atual</p>
              <p>R$ {ticker.regularMarketPrice.toFixed(2).replace('.', ',')}</p>
            </TickerPrice>
            <TickerVariation color={variationCollor(ticker.regularMarketChangePercent)}>
              <p>Variação diária</p>
              <div>
                {ticker.regularMarketChangePercent > 0 ? <RxTriangleUp /> : <RxTriangleDown />}
                <p>{ticker.regularMarketChangePercent.toFixed(2).replace('.', ',')}%</p>
              </div>
            </TickerVariation>
            <DeleteContainer onClick={() => deleteTicker(ticker.symbol)}>
              <BsFillTrash3Fill />
            </DeleteContainer>
          </TickerContainer>
        );
      })}
    </>
  );
}

const TickerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  justify-content: space-around;
  align-items: center;
`;

const TickerImage = styled.img`
  width: 3rem;
  border-radius: 0.5rem;
`;

const Ticker = styled.div``;

const TickerName = styled.div``;

const TickerPrice = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const TickerVariation = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.color};
  }
`;

const DeleteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`;
