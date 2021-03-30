import React, { useState, useEffect } from 'react';
import { Pagination, Typography, message } from 'antd';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import * as actions from '../../actions/actions';
import ApiServices from '../../services';
import { saveData } from '../../localStorage';
import Spinner from '../spiner/Spiner';
import Like from '../like/Like';
import 'antd/dist/antd.css';
import './ArticleList.scss';

const ArticleList = ({ getAllArticles, articles }) => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  /* eslint-disable */
  useEffect(() => {
    ApiServices.allArticlesRequest(page)
      .then((data) => getAllArticles(data.articles))
      .catch(() => message.warning('Something went wrong'));

    setLoading(true);
  }, [page, getAllArticles]);
  /* eslint-enable */

  const articleCard = (item) => {
    const { title, body, author, updatedAt, slug, tagList } = item;
    const date = format(new Date(updatedAt), 'PP');
    const itemSlug = `/articles/${slug}`;
    const artileBody = `${body.split(' ').slice(0, 35).join(' ')}`;
    const { Text } = Typography;

    const showTags = (arr) => {
      if (arr.length !== 0) {
        return arr.map((elem) => (
          <Text keyboard type="secondary" className="tag" key={elem}>
            {elem}
          </Text>
        ));
      }
      return (
        <Text type="secondary" className="tag">
          There are no tags
        </Text>
      );
    };

    return (
      <div className="articleCard" key={slug}>
        <div className="basicInf">
          <div className="articleHeader">
            <Link to={itemSlug} id={slug} onClick={(event) => saveData(event.target.id)} className="title">
              {title}
            </Link>
            <Like slug={slug} />
          </div>
          <div className="tagDiv">{showTags(tagList)}</div>
          <div className="textDiv">
            {/* <p className="articleText articleTextHide">{artileBody}</p> */}
            <ReactMarkdown className="articleText articleTextHide">{artileBody}</ReactMarkdown>
          </div>
        </div>
        <div className="author">
          <div className="authorInf">
            <p className="authorName">{author.username}</p>
            <p className="articleDate">{date}</p>
          </div>
          <div className="authorPhoto">
            <img className="authorPhoto" src={author.image} alt="author" />
          </div>
        </div>
      </div>
    );
  };

  if (!loading || articles.length === 0) return <Spinner />;

  return (
    <div>
      {/* <ArticleItem loading={loading} setPage={setPage} /> */}
      {articles && articles.map((article) => articleCard(article))}

      <Pagination
        className="pagination"
        defaultCurrent={1}
        size="small"
        total={100}
        onChange={(elem) => setPage(elem * 10 - 10)}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  articles: state.articles[0],
});

ArticleList.defaultProps = {
  articles: [],
  getAllArticles: () => {},
};

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object.isRequired),
  getAllArticles: PropTypes.func,
};

export default connect(mapStateToProps, actions)(ArticleList);
