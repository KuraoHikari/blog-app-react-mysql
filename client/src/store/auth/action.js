import { login, register } from '../../api';
import { registerValidation } from '../../utils/registerValidation';
import { LOADING, LOGIN, REGISTER, ERR_CONDITION, CURRENT_USER } from './type';

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
    const validateData = registerValidation(formData);
    if (validateData.validate) {
      const { data } = await register(formData);

      dispatch({ type: REGISTER, data: data.data });
      history('../', { replace: true });
    } else {
      throw {
        response: {
          data: validateData,
        },
      };
    }
  } catch (err) {
    if (err?.response) {
      dispatch({ type: ERR_CONDITION, data: err?.response?.data });
    } else {
      dispatch({ type: ERR_CONDITION, data: { message: '500 internal server error' } });
    }
  }
};

export const authCurrentUser = (history) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, data: true });
    if (localStorage.getItem('access_token')) {
      dispatch({ type: CURRENT_USER, data: JSON.parse(localStorage.getItem('access_token')) });
    } else {
      dispatch({ type: CURRENT_USER, data: null });
    }
  } catch (err) {
    dispatch({ type: ERR_CONDITION, data: { message: '500 internal server error' } });
  }
};
