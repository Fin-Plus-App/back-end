import styled from 'styled-components';

export default function Transaction({ transaction }) {
  return (
    <TransactionContainer>
      <TransactionInfo>
        <p>{transaction.ticker} </p>
      </TransactionInfo>
      <TransactionInfo>
        <p>{transaction.amount.toFixed(2).replace('.', ',')}</p>
      </TransactionInfo>
      <TransactionInfo>
        <p>R$ {(transaction.totalPrice / 100 / transaction.amount).toFixed(2).replace('.', ',')}</p>
      </TransactionInfo>
      <TransactionInfo>
        <p>R$ {(transaction.totalPrice / 100).toFixed(2).replace('.', ',')}</p>
      </TransactionInfo>
      <TransactionInfo>{transaction.status === 'BUY' ? <p>Compra</p> : <p> Venda</p>}</TransactionInfo>
    </TransactionContainer>
  );
}

const TransactionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`;

const TransactionInfo = styled.div`
  width: 4rem;
  height: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
`;
