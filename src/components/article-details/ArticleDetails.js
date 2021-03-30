import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Modal, Typography , message } from 'antd';
import 'antd/dist/antd.css';
import { Link, Redirect } from 'react-router-dom';
import ApiServices from '../../services';
import Like from '../like/Like';
import * as actions from '../../actions/actions';
import Spinner from '../spiner/Spiner';
import { newArticlePath } from '../../routeService';


import './ArticleDetails.scss';

const ArticleDetails = ({ getArticleAuthorData, authorData, slugProp, userData }) => {
  const [articleItem, setArticleItem] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteFag, setDeleteFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const { Text } = Typography;
  const userName = userData.name;

  /* eslint-disable */
  useEffect(() => {
    ApiServices.getOneArticle(slugProp)
      .then((data) => {
        setArticleItem(data.article);
        getArticleAuthorData(data.article.author.username, data.article.author.image, data.article.updatedAt);
      })
      .catch(() => message.warning('Something went wrong'));
  }, [slugProp, getArticleAuthorData]);
  /* eslint-enable */

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setDeleteFlag(true);
    ApiServices.deleteMyArticle(slugProp);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteMyArticle = (name) => {
    if (name === userName) {
      return (
        <div className="editArticleBtns">
          <input type="submit" value="Delete" className="loginBtn editArticleBtn" onClick={() => showModal()} />
          <Modal title="Warning!!!" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Are you sure you want to delete this article?</p>
          </Modal>
          <Link to={`/articles/${slugProp}/edit`}>
            <input
              type="submit"
              value="Edit"
              className="loginBtn editArticleBtn editMyArticle"
              onClick={() => setEditFlag(true)}
            />
          </Link>
        </div>
      );
    }
    return null;
  };

  const showAuthor = (author) => {
    // const date = format(new Date(authorData[2]), 'PP')
    if (author) {
      return (
        <div>
          <div className="author">
            <div className="authorInf">
              <p className="authorName">{author[0]}</p>
              <p className="articleDate">date</p>
            </div>
            <div className="authorPhoto">
              <img className="authorPhoto" src={author[1]} alt="author" />
            </div>
          </div>
          {deleteMyArticle(author[0])}
        </div>
      );
    }
    return (
      <div className="author">
        <div className="authorInf">
          <p className="authorName">Name</p>
          <p className="articleDate">date</p>
        </div>
        <div className="authorPhoto">
          <img
            className="authorPhoto"
            src="https://im0-tub-ru.yandex.net/i?id=9059229b4a3f3cc3c24c6454ac4eddc6&n=13"
            alt="author"
          />
        </div>
      </div>
    );
  };

  const extendedArticle = (data) => {
    const { title, body, slug, tagList } = data;

    const showTags = (arr) => {
      if (tagList !== undefined) {
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
      }
      return null;
    };

    return (
      <div className="articleCard articleCardDetail" key={`${slug}${title}`}>
        <div className="basicInf">
          <div className="articleHeader">
            <span className="title">{title}</span>
            <Like slug={slug} />
          </div>
          <div className="tagDiv">{showTags(tagList)}</div>
          <div className="textDiv">
            {/* <p className="articleText">{body}</p> */}
            <ReactMarkdown className="articleText">{body}</ReactMarkdown>
          </div>
        </div>
        {authorData && showAuthor(authorData)}
      </div>
    );
  };

  if (deleteFag) return <Redirect to={newArticlePath} />;
  if (editFlag) return <Redirect to={`/articles/${slugProp}/edit`} />;

  if (!articleItem) return <Spinner />;

  return <div>{articleItem && extendedArticle(articleItem)}</div>;
};

const mapStateToProps = (state) => ({
  authorData: state.authorData,
  userData: state.userData,
});

ArticleDetails.defaultProps = {
  getArticleAuthorData: () => {},
  authorData: [],
  slugProp: '',
  userData: [],
};

ArticleDetails.propTypes = {
  getArticleAuthorData: PropTypes.func,
  authorData: PropTypes.arrayOf(PropTypes.string.isRequired),
  slugProp: PropTypes.string,
  userData: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default connect(mapStateToProps, actions)(ArticleDetails);
