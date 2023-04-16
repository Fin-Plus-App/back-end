import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import useUserPortifolio from '../../hooks/api/useUserPortifolio';
import useTickersData from '../../hooks/brapiApi/useTickersData';
import PortfolioTickers from '../../components/PortfolioTickers';
import PortfolioChart from '../../components/PortifolioChart';
import styled from 'styled-components';

export default function Portifolio() {
  const [tickersData, setTickersData] = useState();
  const { userPortifolio } = useUserPortifolio();
  const { getTickersData } = useTickersData();
  const [total, setTotal] = useState();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Valor',
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
    hoverOffset: 4,
  });

  useEffect(() => {
    if (userPortifolio) {
      const tickersList = [];
      userPortifolio.forEach((item) => {
        return tickersList.push(item.ticker);
      });

      const params = tickersList.join('%2C');

      getPortifolioTickersData(params);
    }
  }, [userPortifolio]);

  async function getPortifolioTickersData(params) {
    try {
      const result = await getTickersData(params);
      setTickersData(result);

      const labels = userPortifolio.map((portifolioItem) => {
        return portifolioItem.ticker;
      });

      const datasets = {
        label: 'Valor',
        data: [],
        backgroundColor: [],
      };

      let totalPortifolio = 0;

      userPortifolio.forEach((portifolioItem) => {
        const tickerData = result.find((data) => {
          return data.symbol === portifolioItem.ticker;
        });

        if (tickerData) {
          const amount = portifolioItem.amount;
          const regularMarketPrice = tickerData.regularMarketPrice;
          const totalTicker = Number((amount * regularMarketPrice).toFixed(2));

          totalPortifolio += totalTicker;
          datasets.data.push(totalTicker);
          datasets.backgroundColor.push(getRandomColor());
        }
      });

      setTotal(totalPortifolio.toFixed(2).replace('.', ','));
      setChartData({
        labels: labels,
        datasets: [datasets],
        hoverOffset: 4,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  if (!chartData || !userPortifolio || !tickersData) {
    return <></>;
  }

  return (
    <PortfolioContainer>
      <Header />
      <PageTitle>Minha Carteira</PageTitle>
      <PortfolioInfos>
        <PortfolioChart chartData={chartData} total={total} />
        <PortfolioTickers userPortifolio={userPortifolio} tickersData={tickersData} />
      </PortfolioInfos>
    </PortfolioContainer>
  );
}

const PortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  color: #ffffff;
  margin-top: 4rem;
`;

const PortfolioInfos = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 1.5rem;
  text-align: center;
  cursor: pointer;
`;
