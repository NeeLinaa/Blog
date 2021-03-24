import React from 'react';
import { Pagination, Typography } from 'antd';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveData } from '../../localStorage';
import * as actions from '../../actions/actions';
import Like from '../like/Like';
import 'antd/dist/antd.css';
import { spiner } from '../../utilits';

import './ArticleItem.scss';

const ArticleItem = ({ articles, loading, setPage }) => {
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
            <p className="articleText">{artileBody}</p>
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

  if (!loading) return spiner();

  return (
    <div>
      <div>{articles && articles.map((article) => articleCard(article))}</div>;
      <div className="pagination">
        <Pagination defaultCurrent={1} total={500} onChange={(elem) => setPage(elem * 10 - 10)} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  articles: state.articles[0],
  loading: state.articles[1],
});

ArticleItem.defaultProps = {
  articles: [],
  loading: false,
  setPage: () => {},
};

ArticleItem.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object.isRequired),
  loading: PropTypes.bool,
  setPage: PropTypes.func,
};

export default connect(mapStateToProps, actions)(ArticleItem);
