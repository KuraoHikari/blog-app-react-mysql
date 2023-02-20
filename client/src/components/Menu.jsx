import React from 'react';
import { Link } from 'react-router-dom';
const Menu = ({ recomended }) => {
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {recomended?.map((post) => (
        <div className="post" key={post?.id}>
          <img src={post?.image} alt="" />
          <h2>
            {post?.title}
            {post?.id}
          </h2>
          <Link to={`/post/${post?.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
