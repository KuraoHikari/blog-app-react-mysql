import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/auth/action';
const initializeState = { username: '', email: '', password: '' };

const Register = () => {
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
    // console.log(formData)

    // registerValidation(formData);
    dispatch(registerUser(formData, history));
  };
  const [err] = useState(null);
  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input className={isError ? 'error' : 'input'} required name="username" type="text" placeholder="username" onChange={handleChange} />
        <input className={isError ? 'error' : 'input'} required name="email" type="email" placeholder="email" onChange={handleChange} />
        <input className={isError ? 'error' : 'input'} required name="password" type="password" placeholder="password" onChange={handleChange} />

        <button type="submit">{isLoading && <i className="fa fa-circle-o-notch fa-spin"></i>} Register</button>
        {isError && <p>{isError?.message}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
