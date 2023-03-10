import { LOADING, ERR_CONDITION, FETCH_POST, FETCH_ONE_POST } from './type';

const initialPostState = {
  isCreateLoading: false,
  isCreateError: null,
  posts: null,
  post: null,
};

export default function reducer(state = initialPostState, action) {
  switch (action.type) {
    case LOADING:
      const loading = {
        ...state,
        isCreateLoading: action.data,
      };

      return loading;

    case FETCH_ONE_POST:
      const post = {
        ...state,
        post: action.data,
      };

      return post;

    case FETCH_POST:
      const posts = {
        ...state,
        posts: action.data,
      };

      return posts;
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
