import styled from 'styled-components';
import Transaction from './Transaction';
import dayjs from 'dayjs';

export default function DailyTransactions({ dailyTransactions }) {
  const dateString = dailyTransactions.date;
  const date = dayjs(dateString).format('DD/MM/YYYY');

  return (
    <DailyContainer>
      <DailyTitle>
        <h3>{date}</h3>
      </DailyTitle>
      {dailyTransactions.trades.map((transaction) => {
        return (
          <TransactionContainer key={transaction.id}>
            <Transaction transaction={transaction} />
            <Border></Border>
          </TransactionContainer>
        );
      })}
    </DailyContainer>
  );
}

const DailyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DailyTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;

  h3 {
    margin-right: 2rem;
    font-size: 1rem;
    font-weight: 500;
  }
`;

const Border = styled.div`
  width: 95%;
  border-bottom: 1px solid black;
`;
