export type ApplicationError = {
  name: string;
  message: string;
};

export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};

export type SignInParams = {
  email: string;
  password: string;
};

export type CreateFavoriteStockParams = {
  ticker: string;
};

export type DeleteFavoriteStockParams = {
  ticker: string;
};

export type CreateTransactionParams = {
  ticker: string;
  totalPrice: number;
  amount: number;
  date: Date;
  status: 'BUY' | 'SELL';
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type BrapiAvaiable = {
  stocks: string[];
};
