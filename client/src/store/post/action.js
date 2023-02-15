import { createPostApi, getAllPost, getOnePost } from '../../api';
import FormData from 'form-data';
import { LOADING, ERR_CONDITION, FETCH_POST, FETCH_ONE_POST } from './type';
import { logoutUser } from '../auth/action';

export const createPost = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, data: true });
    console.log('masuk sini');
    const form = new FormData();
    const { title, cat, images, desc } = formData;
    form.append('title', title);
    form.append('desc', desc);
    form.append('images', images);
    form.append('cat', cat);
    const tokenHeader = JSON.parse(localStorage.getItem('access_token'));
    const { data } = await createPostApi(form, {
      access_token: tokenHeader.token,
    });
    dispatch({ type: LOADING, data: false });
    history('/', { replace: true });
  } catch (err) {
    if (err?.response?.data.message === 'Token is not valid') {
      dispatch(logoutUser());
      history('/login', { replace: true });
    } else {
      dispatch({ type: ERR_CONDITION, data: { message: '500 internal server error' } });
    }
  }
};

export const fetchPost = (url) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, data: true });

    const { data } = await getAllPost(url);
    console.log('🚀 ~ file: action.js:31 ~ fetchPost ~ data', data);

    dispatch({ type: FETCH_POST, data: data.data });

    dispatch({ type: LOADING, data: false });
  } catch (err) {
    dispatch({ type: LOADING, data: false });
    dispatch({ type: ERR_CONDITION, data: { message: '500 internal server error' } });
  }
};
export const fetchPostv2 = (url) => async (dispatch) => {
  try {
    const { data } = await getAllPost(url);

    dispatch({ type: FETCH_POST, data: data.data });
  } catch (err) {
    dispatch({ type: ERR_CONDITION, data: { message: '500 internal server error' } });
  }
};

export const fetchSinglePost = (url) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, data: true });

    const { data } = await getOnePost(url);
    console.log('🚀 ~ file: action.js:53 ~ fetchSinglePost ~ data', data);
    // const posts = await getAllPost(`/?cat=${data.data.cat}`);

    dispatch({ type: FETCH_ONE_POST, data: data.data });
    // dispatch({ type: FETCH_POST, data: posts.data.data });

    dispatch({ type: LOADING, data: false });
  } catch (err) {
    dispatch({ type: LOADING, data: false });
    dispatch({ type: ERR_CONDITION, data: { message: '500 internal server error' } });
  }
};
