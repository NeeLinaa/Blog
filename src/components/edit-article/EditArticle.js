import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import NewArticle from '../new-article/NewArticle';
import ApiServices from '../../services';
import { articlesListPath } from '../../routeService';
import Spiner from '../spiner/Spiner';

const EditArticle = ({ slugEdit }) => {
  const [editArticleFlag, setEditArticleFlag] = useState(false);
  const [articleData, setArticleData] = useState(false);

  const editMyArticle = {
    height: 701,
    width: 938,
  };

  /* eslint-disable */
  useEffect(() => {
    ApiServices.getOneArticle(slugEdit)
      .then((data) => {
        console.log(data);
        setArticleData(data.article);
      })
      .catch(() => message.warning('Failed to edit article'));
  }, []);
  /* eslint-enable */

  const onSubmit = (data) => {
    const { title, shortDescr, text, ...tags } = data;
    const postData = {
      title,
      shortDescr,
      text,
      tagList: Object.values(tags),
    };
    ApiServices.updateArticle(slugEdit, postData);
    setEditArticleFlag(true);
  };

  if (articleData && editArticleFlag) return <Redirect to={articlesListPath} />;

  if (!articleData) return <Spiner />;

  return (
    <div className="formBlock" style={editMyArticle}>
      <p className="formHeader newArticleHeader">Edit article</p>
      <NewArticle onSubmit={onSubmit} articleData={articleData} />
    </div>
  );
};

EditArticle.defaultProps = {
  slugEdit: '',
};

EditArticle.propTypes = {
  slugEdit: PropTypes.string,
};

export default EditArticle;
