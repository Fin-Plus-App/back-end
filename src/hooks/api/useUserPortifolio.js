import useAsync from '../useAsync';

import * as transactionApi from '../../services/api/transactionsApi';
import useToken from '../useToken';

export default function useUserPortifolio() {
  const token = useToken();

  const {
    data: userPortifolio,
    loading: userPortifolioLoading,
    error: userPortifolioError,
    act: getUserPortifolio,
  } = useAsync(() => transactionApi.getUserPortifolio(token));

  return {
    userPortifolio,
    userPortifolioLoading,
    userPortifolioError,
    getUserPortifolio,
  };
}
