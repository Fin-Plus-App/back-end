import styled from 'styled-components';

export default function SearchList({ tickersList, setSearchOpen, setSelectedTicker, setSearchValue }) {
  function selectTicker(ticker) {
    setSelectedTicker(ticker);
    setSearchValue(ticker);
    setSearchOpen(false);
  }

  return (
    <SearchListContainer>
      {tickersList.length === 0 ? (
        <ResultSearch>Nenhum resultado encontrado!</ResultSearch>
      ) : (
        <>
          {tickersList.map((ticker, index) => {
            return (
              <ResultSearch key={index} onClick={() => selectTicker(ticker)}>
                {ticker}
              </ResultSearch>
            );
          })}
        </>
      )}
    </SearchListContainer>
  );
}

const SearchListContainer = styled.div``;

const ResultSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  cursor: pointer;
`;
