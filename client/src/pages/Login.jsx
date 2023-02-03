import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/auth/action';
const initializeState = { email: '', password: '' };
const Login = () => {
  const [formData, setFormData] = useState(initializeState);
  const [err] = useState(null);
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
  // useEffect(() => {
  //   dispatch(fetchManga(mangaSearch));
  // }, [mangaSearch]);
  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input required name="email" onChange={handleChange} type="email" placeholder="email" />
        <input required name="password" onChange={handleChange} type="password" placeholder="password" />
        <button type="submit">Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
