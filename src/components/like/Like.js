import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import like from '../../img/Likes.svg';
import redLike from '../../img/RedLikes.svg';
import ApiServices from '../../services';

import './Like.scss';

const Like = ({ slug }) => {
  const apiServices = new ApiServices();
  const [likeFlag, setLikeFlag] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const userToken = localStorage.getItem('userToken');

  const sendFavoriteArticleRequest = (apiFunc, slugParam, method) =>
    apiFunc(slugParam, method).then((data) => {
      setLikeFlag(data.article.favorited);
      setLikeCount(data.article.favoritesCount);
    });

  /* eslint-disable */
  useEffect(() => {
    slug &&
      userToken &&
      apiServices
        .getOneArticle(slug)
        .then((data) => {
          setLikeFlag(data.article.favorited);
          setLikeCount(data.article.favoritesCount);
        })
        .catch((err) => console.log(err));
  }, []);
  /* eslint-enable */

  const likeArticle = () => {
    if (likeFlag) {
      return sendFavoriteArticleRequest(apiServices.rateArticle, slug, 'DELETE');
    }
    return sendFavoriteArticleRequest(apiServices.rateArticle, slug, 'POST');
  };

  if (!likeFlag) {
    return (
      <div style={{ width: 35 }}>
        <input type="image" alt="like" src={like} onClick={() => likeArticle()} />
        <span className="like">{likeCount}</span>
      </div>
    );
  }

  return (
    <div style={{ width: 35 }}>
      <input type="image" alt="like" src={redLike} onClick={() => likeArticle()} />
      <span className="like">{likeCount}</span>
    </div>
  );
};

Like.defaultProps = {
  slug: '',
};

Like.propTypes = {
  slug: PropTypes.string,
};

export default Like;
