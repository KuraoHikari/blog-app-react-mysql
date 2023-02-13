import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../store/post/action';
import DOMPurify from 'dompurify';

const Home = () => {
  const cat = useLocation().search;
  const location = useLocation();
  const dispatch = useDispatch();
  const { isCreateLoading, isCreateError, posts } = useSelector((state) => ({
    isCreateLoading: state.post.isLoading,
    isCreateError: state.post.isError,
    posts: state.post.posts,
  }));
  // const posts = [];
  useEffect(() => {
    dispatch(fetchPost(cat));
    // posts
    console.log('🚀 ~ file: Home.jsx:19 ~ useEffect ~ posts', posts);
    console.log('🚀 ~ file: Home.jsx:21 ~ useEffect ~ cat', cat);
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };
  // const getClassNameLink = (html) => {
  //   new URLSearchParams(location.search).get('page') == null;
  //   return doc.body.textContent;
  // };
  // const getText = (html) => {
  //   var t = document.createElement('template');
  //   t.innerHTML = html;
  //   return t.content;
  // };

  return (
    <div className="home">
      <div className="posts">
        {!isCreateLoading &&
          posts?.rows?.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={post.image} alt={`${post.title}.png`} loading="lazy" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <div className="desc">
                  <p>{getText(post.desc)}</p>
                </div>

                <button>Read More</button>
              </div>
            </div>
          ))}
        {!isCreateLoading && (
          <div className="pagination">
            <Link
              to={
                new URLSearchParams(location.search).get('cat')
                  ? `/?cat=${new URLSearchParams(location.search).get('cat')}&page=${posts?.currentPage == 0 ? 0 : posts?.currentPage - 1}`
                  : `/?page=${posts?.currentPage == 0 ? 0 : posts?.currentPage - 1}`
              }
            >
              <span>&laquo;</span>
            </Link>
            {/* <a href="#">&laquo;</a> */}
            {Array.from(Array(posts?.totalPages), (e, i) => {
              return (
                <Link
                  key={i}
                  className={new URLSearchParams(location.search).get('page') ? (new URLSearchParams(location.search).get('page') == i ? 'active link' : 'link') : i == 0 ? 'active link' : 'link'}
                  to={new URLSearchParams(location.search).get('cat') ? `/?cat=${new URLSearchParams(location.search).get('cat')}&page=${i}` : `/?page=${i}`}
                >
                  <span> {i}</span>
                </Link>
                // <a className={new URLSearchParams(location.search).get('page') == i ? `active` : ''} key={i} href="#">
                //   {i}
                // </a>
              );
            })}
            <Link
              to={
                new URLSearchParams(location.search).get('cat')
                  ? `/?cat=${new URLSearchParams(location.search).get('cat')}&page=${posts?.currentPage == posts?.totalPages - 1 ? posts?.totalPages - 1 : posts?.currentPage + 1}`
                  : `/?page=${posts?.currentPage == posts?.totalPages - 1 ? posts?.totalPages - 1 : posts?.currentPage + 1}`
              }
            >
              <span>&raquo;</span>
            </Link>
            {/* <a href="#">&raquo;</a> */}
            {/* <a href="#">&laquo;</a>
          <a href="#">1</a>
          <a className="active" href="#">
            2
          </a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">&raquo;</a> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
