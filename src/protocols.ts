export type ApplicationError = {
  name: string;
  message: string;
};

export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};
