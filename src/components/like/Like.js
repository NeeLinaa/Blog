import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import like from '../../img/Likes.svg';
import redLike from '../../img/RedLikes.svg';
import ApiServices from '../../services';
import { getToken } from '../../localStorage';

import './Like.scss';

const Like = ({ slug }) => {
  const [likeFlag, setLikeFlag] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const userToken = getToken();
  const style = {
    width: 35,
  };

  /* eslint-disable */
  useEffect(() => {
    slug &&
      userToken &&
      ApiServices.getOneArticle(slug)
        .then((data) => {
          setLikeFlag(data.article.favorited);
          setLikeCount(data.article.favoritesCount);
        })
        .catch((err) => console.log(err));
  }, []);
  /* eslint-enable */

  const sendFavoriteArticleRequest = (apiFunc, slugParam, method) =>
    apiFunc(slugParam, method).then((data) => {
      setLikeFlag(data.article.favorited);
      setLikeCount(data.article.favoritesCount);
    });

  const likeArticle = () => {
    if (userToken) {
      if (likeFlag) {
        return sendFavoriteArticleRequest(ApiServices.rateArticle, slug, 'DELETE');
      }
      return sendFavoriteArticleRequest(ApiServices.rateArticle, slug, 'POST');
    }
    return message.warning('It is impossible to rate the article without authorization');
  };

  return (
    <div style={style}>
      <input type="image" alt="like" src={likeFlag ? redLike : like} onClick={() => likeArticle()} />
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
