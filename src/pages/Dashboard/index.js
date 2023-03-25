import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteTickers from '../../components/FavoriteTickers';
import UserContext from '../../contexts/UserContext';

export default function Dashboard() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.token) {
      navigate('/');
    }
  }, []);
  return (
    <>
      Dashboard
      <FavoriteTickers />
    </>
  );
}
