import styled from 'styled-components';

export default function Transaction({ transaction }) {
  return (
    <TransactionContainer>
      <TransactionInfo>
        <p>Ticker</p>
        <p>{transaction.ticker} </p>
      </TransactionInfo>
      <TransactionInfo>
        <p>Quantidade </p>
        <p>{transaction.amount.toFixed(2).replace('.', ',')}</p>
      </TransactionInfo>
      <TransactionInfo>
        <p>Preço Unit. </p>
        <p>R$ {(transaction.totalPrice / 100 / transaction.amount).toFixed(2).replace('.', ',')}</p>
      </TransactionInfo>
      <TransactionInfo>
        <p>Total </p>
        <p>R$ {(transaction.totalPrice / 100).toFixed(2).replace('.', ',')}</p>
      </TransactionInfo>
      <TransactionInfo>
        <p>Operação </p>
        {transaction.status === 'BUY' ? <p>Compra</p> : <p> Venda</p>}
      </TransactionInfo>
    </TransactionContainer>
  );
}

const TransactionContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;

const TransactionInfo = styled.div`
  height: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
