import { login, register } from '../../api';
import { LOADING, LOGIN, REGISTER, ERR_CONDITION } from './type';

export const loginUser = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, data: true });
    const { data } = await login(formData);

    if (!data.status) {
      throw '';
    }
    dispatch({ type: LOGIN, data: data.data });
    history('../', { replace: true });
  } catch (err) {
    dispatch({ type: ERR_CONDITION, data: { message: 'email/password incorect' } });
  }
};

export const registerUser = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, data: true });
    const { data } = await register(formData);

    if (!data.status) {
      throw { message: 'email/password incorect' };
    }
    //note perbaikan register login respon buat js
    dispatch({ type: REGISTER, data: data.data });
    history('../', { replace: true });
  } catch (err) {
    dispatch({ type: ERR_CONDITION, data: { message: 'email/password incorect' } });
  }
};
