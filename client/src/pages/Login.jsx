import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/auth/action';
const initializeState = { email: '', password: '' };
const Login = () => {
  const [formData, setFormData] = useState(initializeState);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { isLoading, isError } = useSelector((state) => ({
    isLoading: state.auth.isLoading,
    isError: state.auth.isError,
  }));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData, history));
  };
  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input className={isError ? 'error' : 'input'} required name="email" onChange={handleChange} type="email" placeholder="email" />
        <input className={isError ? 'error' : 'input'} required name="password" onChange={handleChange} type="password" placeholder="password" />
        <button type="submit">{isLoading && <i className="fa fa-circle-o-notch fa-spin"></i>} Login</button>
        {isError && <p>{isError?.message}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
