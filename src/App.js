import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import { router } from './routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
