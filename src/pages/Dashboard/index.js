import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteTickers from '../../components/FavoriteTickers';
import Header from '../../components/Header';
import UserContext from '../../contexts/UserContext';
import styled from 'styled-components';

export default function Dashboard() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.token) {
      navigate('/');
    }
  }, []);
  return (
    <DashboardContainer>
      <Header page={'Dashboard'} />
      <FavoriteTickers />
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
