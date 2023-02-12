import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../store/post/action';
import DOMPurify from 'dompurify';

const Home = () => {
  const cat = useLocation().search;
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
  }, [cat]);

  // const getText = (html) => {
  //   const doc = new DOMParser().parseFromString(html, 'text/html');
  //   return doc.body.textContent;
  // };
  const getText = (html) => {
    var t = document.createElement('template');
    t.innerHTML = html;
    return t.content;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts &&
          posts?.rows?.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={post.image} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.desc),
                  }}
                />
                <button>Read More</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
