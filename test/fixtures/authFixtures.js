export const initialState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
};

export const authenticatedState = {
  status: "authenticated",
  user: {
    uid: "ABC-123",
    name: "Test",
  },
  errorMessage: undefined,
};

export const notAuthenticatedState = {
  status: "not-authenticated",
  user: {},
  errorMessage: undefined,
};

export const testUser = {
  uid: "63e2fe4252544c7943f35b5c",
  name: "Test",
  email: "test@gmail.com",
  password: "123456",
};
