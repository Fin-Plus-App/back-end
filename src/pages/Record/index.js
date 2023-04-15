import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import useAllUserTransactions from '../../hooks/api/useAllUserTransactions';
import styled from 'styled-components';
import Header from '../../components/Header';
import DailyTransactions from '../../components/DailyTransactions';

export default function Record() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [userTransactions, setUserTransactions] = useState();

  const { allUserTransactions } = useAllUserTransactions();

  useEffect(() => {
    if (!userData.token) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (allUserTransactions) {
      const groupedTransactions = allUserTransactions.reduce((acc, curr) => {
        const date = curr.date;

        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
      }, {});

      const transformedArray = Object.entries(groupedTransactions).map(([key, value]) => ({
        date: key,
        trades: value,
      }));

      setUserTransactions(transformedArray);
    }
  }, [allUserTransactions]);

  if (!userTransactions) {
    return <></>;
  }

  return (
    <RecordContainer>
      <Header page={'Registros'} />
      <RecordInfos>
        <RecordSubTitle>
          <h2>Histórico de compra e venda:</h2>
        </RecordSubTitle>
        {userTransactions.map((dailyTransactions) => {
          return <DailyTransactions key={dailyTransactions.date} dailyTransactions={dailyTransactions} />;
        })}
      </RecordInfos>
    </RecordContainer>
  );
}

const RecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #ffffff;
`;

const RecordInfos = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 4rem;
  margin-bottom: 2rem;
`;

const RecordSubTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2rem 0 1rem 0;

  h2 {
    font-size: 1.2rem;
    font-weight: 500;
  }
`;
