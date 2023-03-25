import FavoriteTickers from '../../components/FavoriteTickers';
import useDashboardFavorites from '../../hooks/api/useDashboardFavorites';

export default function Dashboard() {
  const { dashboardFavorites } = useDashboardFavorites();

  return (
    <>
      Dashboard
      <FavoriteTickers />
    </>
  );
}
