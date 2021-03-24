import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../actions/actions';
import ApiServices from '../../services';
import ArticleItem from '../article-item/ArticleItem';
import 'antd/dist/antd.css';
import './ArticleList.scss';

const ArticleList = ({ getAllArticles, loadingStor }) => {
  const apiServices = new ApiServices();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(loadingStor);

  /* eslint-disable */
  useEffect(() => {
    apiServices.allArticlesRequest(page).then((data) => getAllArticles(data.articles));

    setLoading(false);
  }, [page, getAllArticles]);
  /* eslint-enable */

  return <ArticleItem loading={loading} setPage={setPage} />;
};

const mapStateToProps = (state) => ({
  loadingStor: state.articles[1],
});

ArticleList.defaultProps = {
  getAllArticles: () => {},
  loadingStor: true,
};

ArticleList.propTypes = {
  getAllArticles: PropTypes.func,
  loadingStor: PropTypes.bool,
};

export default connect(mapStateToProps, actions)(ArticleList);
