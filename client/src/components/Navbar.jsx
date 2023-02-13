import React from 'react';
import { Logo } from '../img';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/auth/action';

const Navbar = () => {
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => ({
    authData: state.auth.authData,
  }));
  const handleLogout = (e) => {
    e.preventDefault();
    // console.log(formData)

    // registerValidation(formData);
    dispatch(logoutUser());
  };
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          {authData && <span>{authData?.username}</span>}

          <span onClick={handleLogout}>Logout</span>
          {!authData && (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          {authData && (
            <span className="write">
              <Link className="link" to="/write">
                Write
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
