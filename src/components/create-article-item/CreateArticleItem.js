import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from '../../actions/actions';
import ApiServices from '../../services';
import NewArticle from '../new-article/NewArticle';

import './CreateArticleItem.scss';

const CreateArticleItem = ({ createNewArticle }) => {
  const apiServices = new ApiServices();
  const [flag, setFlag] = useState(false);

  const onSubmit = (data) => {
    setFlag(true);
    createNewArticle(data.title, data.shortDescr, data.text);
    const { title, shortDescr, text, ...tagList } = data;
    apiServices.createArticle(title, shortDescr, text, Object.values(tagList)).catch(() => {
      throw new Error();
    });
  };

  if (flag) return <Redirect to="/articles" />;

  return (
    <div className="formBlock" style={{ minHeight: 701, width: 938, overflow: 'auto' }}>
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
