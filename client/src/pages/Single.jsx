import React from 'react';
import { Edit, Delete } from '../img';
import { Link } from 'react-router-dom';
import { Menu } from '../components';

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img src="" alt="" />
        <div className="user">
          <img src="" alt="" />
          <div className="info">
            <span>Kurao</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`}>
              <img src={Edit} alt="" />
            </Link>

            <img src={Delete} alt="" />
          </div>
        </div>
        <h1>Lorem ipsum dolor </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta soluta eos pariatur, excepturi doloribus similique. Cum consectetur vitae soluta reprehenderit optio saepe consequuntur, quod eos nemo in omnis similique alias.</p>
      </div>
      <Menu />
    </div>
  );
};

export default Single;
