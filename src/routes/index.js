import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Portifolio from '../pages/Portifolio';
import Record from '../pages/Record';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
    errorElement: <NotFound />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
    errorElement: <NotFound />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <NotFound />,
  },
  {
    path: '/registro',
    element: <Record />,
    errorElement: <NotFound />,
  },
  {
    path: '/portifolio',
    element: <Portifolio />,
    errorElement: <NotFound />,
  },
]);
