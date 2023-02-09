import { LOADING, ERR_CONDITION } from './type';

const initialPostState = {
  isCreateLoading: false,
  isCreateError: null,
  posts: null,
};

export default function reducer(state = initialPostState, action) {
  switch (action.type) {
    case LOADING:
      const loading = {
        ...state,
        isCreateLoading: action.data,
      };

      return loading;
    case ERR_CONDITION:
      const newError = {
        ...state,
        isError: action?.data,
        isCreateLoading: false,
      };

      return newError;
    default:
      return state;
  }
}
