import { LOADING, LOGIN, ERR_CONDITION, REGISTER } from './type';

const initialAuthState = {
  isLoading: false,
  isError: null,
  authData: null,
};

export default function reducer(state = initialAuthState, action) {
  switch (action.type) {
    case LOADING:
      const loading = {
        ...state,
        isLoading: action.data,
      };

      return loading;
    case LOGIN:
      localStorage.setItem('access_token', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, isLoading: false };
    case REGISTER:
      localStorage.setItem('access_token', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, isLoading: false };
    case ERR_CONDITION:
      const newError = {
        ...state,
        isError: action?.data,
        isLoading: false,
      };

      return newError;
    default:
      return state;
  }
}
