import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../store/post/action';
import { Loading } from '../components';

const Home = () => {
  const cat = useLocation().search;
  const location = useLocation();
  const dispatch = useDispatch();
  const { isCreateLoading, posts } = useSelector((state) => ({
    isCreateLoading: state.post.isCreateLoading,
    posts: state.post.posts,
  }));

  useEffect(() => {
    dispatch(fetchPost(cat));
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {isCreateLoading ? (
          <Loading />
        ) : (
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
                <Link to={`/post/${post.id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))
        )}
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

            {Array.from(Array(posts?.totalPages), (e, i) => {
              return (
                <Link
                  key={i}
                  className={new URLSearchParams(location.search).get('page') ? (new URLSearchParams(location.search).get('page') == i ? 'active link' : 'link') : i == 0 ? 'active link' : 'link'}
                  to={new URLSearchParams(location.search).get('cat') ? `/?cat=${new URLSearchParams(location.search).get('cat')}&page=${i}` : `/?page=${i}`}
                >
                  <span> {i}</span>
                </Link>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
