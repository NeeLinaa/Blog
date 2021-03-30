import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { message } from 'antd';
import * as actions from '../../actions/actions';
import ApiServices from '../../services';
import NewArticle from '../new-article/NewArticle';
import { articlesListPath } from '../../routeService';

import './CreateArticleItem.scss';

const CreateArticleItem = ({ createNewArticle }) => {
  const [flag, setFlag] = useState(false);

  const onSubmit = (data) => {
    setFlag(true);
    createNewArticle(data.title, data.shortDescr, data.text);
    const { title, shortDescr, text, ...tagList } = data;
    const postData = {
      title,
      shortDescr,
      text,
      tagList: Object.values(tagList),
    };
    ApiServices.createArticle(postData).catch(() => message.warning('Failed to create new article'));
  };

  if (flag) return <Redirect to={articlesListPath} />;

  return (
    <div className="formBlock createArtForm">
      <p className="formHeader newArticleHeader">Create new article</p>
      <NewArticle onSubmit={onSubmit} />
    </div>
  );
};

CreateArticleItem.defaultProps = {
  createNewArticle: () => {},
};

CreateArticleItem.propTypes = {
  createNewArticle: PropTypes.func,
};

export default connect(null, actions)(CreateArticleItem);
