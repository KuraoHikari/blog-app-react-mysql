import { createPostApi } from '../../api';
import FormData from 'form-data';
import { LOADING, ERR_CONDITION } from './type';

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
    dispatch({ type: ERR_CONDITION, data: { message: '500 internal server error' } });
  }
};
