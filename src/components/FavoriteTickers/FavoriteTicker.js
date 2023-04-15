import { useState } from 'react';
import styled from 'styled-components';
import useDashboardFavorites from '../../hooks/api/useDashboardFavorites';
import { RxTriangleDown, RxTriangleUp } from 'react-icons/rx';
import { BsFillTrash3Fill } from 'react-icons/bs';
import useDeleteDashBoardFavorite from '../../hooks/api/useDeleteDashboardFavorite';
import { ModalComponent } from '../Modal';
import { toast } from 'react-toastify';

export default function FavoriteTicker({ ticker, setTickers }) {
  const { deleteDashBoardFavorite } = useDeleteDashBoardFavorite();
  const { getDashboardFavorites } = useDashboardFavorites();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function deleteTicker() {
    setLoading(true);

    try {
      await deleteDashBoardFavorite(ticker.id);
      const result = await getDashboardFavorites();
      setTickers(result);
      setLoading(false);
      setIsOpen(false);
      toast.success('Informações salvas com sucesso!');
    } catch (error) {
      setLoading(false);
      setIsOpen(false);
      toast.error('Não foi possível salvar suas informações!');
    }
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
    <TickerContainer>
      <ModalComponent
        title="Deseja remover dos favoritos?"
        close="Cancelar"
        confirm="Continuar"
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        propsFunction={deleteTicker}
        loading={loading}
      />
      <TickerImage src={ticker.logourl} />
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
      <DeleteContainer onClick={() => setIsOpen(true)}>
        <BsFillTrash3Fill />
      </DeleteContainer>
    </TickerContainer>
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
  cursor: pointer;
`;
