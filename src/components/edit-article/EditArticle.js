import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import NewArticle from '../new-article/NewArticle';
import ApiServices from '../../services';

const EditArticle = ({ slugEdit }) => {
  const apiServices = new ApiServices();
  const [editArticleFlag, setEditArticleFlag] = useState(false);
  const [articleData, setArticleData] = useState({});
  const [tagList, setTagList] = useState([]);
  const onSubmit = (data) => {
    setTagList(data.tag);
    const { title, shortDescr, text } = data;
    apiServices.updateArticle(slugEdit, title, shortDescr, text, tagList);
    setEditArticleFlag(true);
  };

  /* eslint-disable */
  useEffect(() => {
    apiServices.getOneArticle(slugEdit).then((data) => setArticleData(data.article));
  }, []);
  /* eslint-enable */

  if (articleData && editArticleFlag) return <Redirect to={`/articles/${slugEdit}`} />;

  return (
    <div className="formBlock" style={{ height: 701, width: 938 }}>
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
