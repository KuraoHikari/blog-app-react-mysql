import React from 'react';
import { Link } from 'react-router-dom';

const ErrorMessage = ({ errcode, message }) => {
  return (
    <div className="mainbox">
      {errcode ? (
        <div className="err">4</div>
      ) : (
        <>
          <div className="err">4</div>
          <i className="far fa-question-circle fa-spin"></i>
          <div className="err2">4</div>
        </>
      )}
      <div className="err">4</div>
      <i className="far fa-question-circle fa-spin"></i>
      <div className="err2">4</div>
      <div className="msg">
        {message ? message : `Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?`}
        <p>
          Let's go <Link to="/">home</Link> and try from there.
        </p>
      </div>
    </div>
  );
};

export default ErrorMessage;
