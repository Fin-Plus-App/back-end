import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import useSearchTickers from '../../hooks/brapiApi/useSearchTickers';
import SearchList from './SearchList';
import useSaveDashBoardFavorites from '../../hooks/api/useSaveDashboardFavorites';
import { toast } from 'react-toastify';

export default function AddFavoriteTicker() {
  const [searchValue, setSearchValue] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [tickersList, setTickersList] = useState();
  const [selectedTicker, setSelectedTicker] = useState();
  const { getSearchTickers } = useSearchTickers();
  const { saveDashBoardFavorites } = useSaveDashBoardFavorites();

  function handleForm(event) {
    const { value } = event.target;
    setSearchValue(value);
  }

  useEffect(() => {
    if (searchValue.length >= 3) {
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
        <SearchLabel htmlFor="ticker">
          <FaSearch />
        </SearchLabel>
      </SearchContainer>
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
      <ButtonContainer>
        {selectedTicker && !searchOpen && (
          <>
            <button onClick={() => cleanSearch()}>Cancelar</button>
            <button onClick={() => addtoFavorites()}>Confirmar</button>
          </>
        )}
      </ButtonContainer>
    </AddFavoriteTickerContainer>
  );
}

const AddFavoriteTickerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchLabel = styled.label`
  cursor: pointer;
`;

const SearchInput = styled.input``;

const SearchContainer = styled.div`
  display: flex;
`;

const ResultContainer = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
`;
