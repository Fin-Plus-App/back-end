import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import useSearchTickers from '../../hooks/brapiApi/useSearchTickers';
import SearchList from './SearchList';
import useSaveDashBoardFavorites from '../../hooks/api/useSaveDashboardFavorites';
import { toast } from 'react-toastify';
import useDashboardFavorites from '../../hooks/api/useDashboardFavorites';

export default function AddFavoriteTicker({ setTickers }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [tickersList, setTickersList] = useState();
  const [selectedTicker, setSelectedTicker] = useState();
  const { getSearchTickers } = useSearchTickers();
  const { saveDashBoardFavorites } = useSaveDashBoardFavorites();
  const { getDashboardFavorites } = useDashboardFavorites();

  function handleForm(event) {
    const { value } = event.target;

    if (searchValue !== undefined) {
      setSelectedTicker();
    }
    setSearchValue(value);
  }

  useEffect(() => {
    if (searchValue.length >= 3 && selectedTicker === undefined) {
      searchTickers();
    } else {
      setTickersList();
    }
  }, [searchValue]);

  async function searchTickers() {
    try {
      const result = await getSearchTickers(searchValue);
      setTickersList(result);
      setSearchOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  function cleanSearch() {
    setSearchValue('');
    setSelectedTicker();
    setSearchOpen(false);
  }

  async function addtoFavorites() {
    try {
      const body = {
        ticker: selectedTicker,
      };

      await saveDashBoardFavorites(body);
      const result = await getDashboardFavorites();
      setTickers(result);
      setSearchValue('');
      setSelectedTicker();
      setSearchOpen(false);
      toast.success('Informações salvas com sucesso!');
    } catch (error) {
      toast.error('Não foi possível salvar suas informações!');
    }
  }

  return (
    <AddFavoriteTickerContainer>
      <SearchContainer>
        <DebounceInput
          name="ticker"
          id="ticker"
          element={SearchInput}
          value={searchValue}
          debounceTimeout={300}
          onChange={handleForm}
          type="text"
          placeholder="Pesquise por um ticker"
          required="required"
          onClick={() => setSearchOpen(true)}
        ></DebounceInput>
        <ResultContainer>
          {tickersList && searchOpen && (
            <SearchList
              tickersList={tickersList}
              setSearchOpen={setSearchOpen}
              setSelectedTicker={setSelectedTicker}
              setSearchValue={setSearchValue}
            />
          )}
        </ResultContainer>
      </SearchContainer>
      <ButtonContainer>
        {selectedTicker && !searchOpen && (
          <>
            <CancelButton onClick={() => cleanSearch()}>Cancelar</CancelButton>
            <ConfirmButton onClick={() => addtoFavorites()}>Confirmar</ConfirmButton>
          </>
        )}
      </ButtonContainer>
    </AddFavoriteTickerContainer>
  );
}

const AddFavoriteTickerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
`;

const SearchLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
  cursor: pointer;
`;

const SearchInput = styled.input`
  width: 60%;
  height: 2.5rem;
  border: 1px solid #cecece;
  border-radius: 0.3rem;
  padding: 0.6rem;
  font-size: 1rem;
  font-weight: 300;
  color: #000000;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ResultContainer = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 2.5rem;
  background: #ffffff;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const CancelButton = styled.button`
  width: 5rem;
  height: 2rem;
  margin: 0 1rem;
  border: none;
  border-radius: 0.5rem;
  background: #ff0000;
  color: #ffffff;
  font-weight: 500;
  cursor: pointer;
`;

const ConfirmButton = styled(CancelButton)`
  background: #008000;
`;
