import { combineReducers } from 'redux';
import auth from './auth/reducer';
import post from './post/reducer';

export default combineReducers({ auth, post });
