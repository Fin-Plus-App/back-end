import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteTickers from '../../components/FavoriteTickers';
import Header from '../../components/Header';
import UserContext from '../../contexts/UserContext';
import styled from 'styled-components';
import PortfolioChart from '../../components/PortifolioChart';
import useUserPortifolio from '../../hooks/api/useUserPortifolio';
import useTickersData from '../../hooks/brapiApi/useTickersData';

export default function Dashboard() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
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
    if (!userData.token) {
      navigate('/');
    }
  }, []);

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
      const labels = userPortifolio.map((portifolioItem) => {
        return portifolioItem.ticker;
      });

      const datasets = {
        label: 'Valor',
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
        borderColor: '#cecece',
        hoverBorderColor: '#252525',
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
          const color = getRandomColor();
          datasets.backgroundColor.push(color);
          datasets.hoverBackgroundColor.push(color);
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

  if (!chartData) {
    return <></>;
  }

  return (
    <DashboardContainer>
      <Header />
      <PageTitle>Dashboard</PageTitle>
      <PortfolioContainer>
        <PortfolioChart chartData={chartData} total={total} />
        <PortfolioLink>
          <Link to="/carteira">Ir para a carteira</Link>
        </PortfolioLink>
      </PortfolioContainer>
      <FavoriteTickers />
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  color: #ffffff;
  margin-top: 4rem;
`;

const PortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 1.5rem;
  text-align: center;
  cursor: pointer;
`;

const PortfolioLink = styled.div`
  font-size: 01rem;
  font-weight: 400;
  color: #2b97e5;
  text-decoration: underline;
  margin-bottom: 0.5rem;
  cursor: pointer;

  a:visited {
    color: #2b97e5;
  }
`;
