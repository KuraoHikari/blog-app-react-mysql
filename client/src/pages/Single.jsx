import React, { useEffect } from 'react';
import { Delete } from '../img';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from '../components';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSinglePost, fetchSinglePost } from '../store/post/action';
import DOMPurify from 'dompurify';

const Single = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();

  const postId = location.pathname.split('/')[2];

  const { isCreateLoading, post, authData } = useSelector((state) => ({
    isCreateLoading: state.post.isCreateLoading,
    post: state.post.post,
    authData: state.auth.authData,
  }));

  const getPermission = (postUserID) => {
    if (authData && authData?.id === Number(postUserID)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    dispatch(fetchSinglePost(postId));
    // eslint-disable-next-line
  }, [postId]);
  return (
    <div className="single">
      {!isCreateLoading && (
        <>
          <div className="content">
            <img src={post?.image} alt={`${post?.title}.png`} loading="lazy" />
            <div className="user">
              {/* <img src="" alt="" /> */}
              <div className="info">
                <span>{post?.User?.username}</span>
                <p>Posted {moment(post?.created_at).fromNow()}</p>
              </div>
              {getPermission(post?.User?.id) && (
                <div className="edit">
                  {/* <Link to={`/write?edit=2`}>
                    <img src={Edit} alt="edit-post.png" loading="lazy" />
                  </Link> */}

                  <img src={Delete} alt="delete-post.png" loading="lazy" onClick={() => dispatch(deleteSinglePost(postId, history))} />
                </div>
              )}
            </div>
            <h1>{post?.title}</h1>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post?.desc),
              }}
            ></p>
          </div>
        </>
      )}
      {!isCreateLoading && <Menu recomended={post?.recomend} postId={postId} />}
    </div>
  );
};

export default Single;
