import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostv2 } from '../store/post/action';

const Menu = ({ recomended }) => {
  // const posts = [];

  // useEffect(() => {
  //   dispatch(fetchPostv2(`/?cat=${cat}`));

  //   console.log(cat);
  // }, []);
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {recomended?.map((post) => (
        <div className="post" key={post?.id}>
          <img src={post?.image} alt="" />
          <h2>{post?.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
