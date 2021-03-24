import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import './NewArticle.scss';

const NewArticle = ({ onSubmit, articleData }) => {
  const { register, handleSubmit, errors } = useForm();
  const [arrTags, setArrTag] = useState([1, 2]);

  const deleteTag = (data) => {
    const index = arrTags.indexOf(data);
    const upDateTagsArr = [...arrTags.slice(0, index), ...arrTags.slice(index + 1)];
    setArrTag(upDateTagsArr);
  };

  const addBtnStyle = {
    color: '#F5222D',
    border: '1px solid #F5222D',
  };
  const tagsStyle = {
    width: 300,
    marginRight: 15,
  };

  // eslint-disable-next-line no-use-before-define
  const createTags = (data) =>
    data.map((elem) => (
      <div className="tagsForm" key={elem}>
        <input
          type="text"
          placeholder="Tag"
          name={elem}
          className="formInput"
          style={tagsStyle}
          ref={register}
          // defaultValue={elem}
        />
        <button type="button" className="serviceTagsBtn serviceTagsBtnDel" onClick={() => deleteTag(elem)}>
          Delete
        </button>
      </div>
    ));

  const addTag = (data) => {
    // const index = arrTags.indexOf(data);
    const newTagsArr = arrTags.slice();
    newTagsArr.push(data.clientX);
    setArrTag(newTagsArr);
  };

  const newArticle = (data) => {
    const { title, description, body } = data;
    return (
      <form className="accFormInputs newArticleForm">
        <div>
          <label className="formText" htmlFor="title">
            Title
          </label>
          <br />
          <textarea
            id="title"
            type="text"
            placeholder="Title"
            name="title"
            required
            className="formInput newArticeInput"
            ref={register}
            defaultValue={title}
          />
          {errors.title && <p>This is required</p>}
        </div>

        <div>
          <label className="formText" htmlFor="descr">
            Short description
          </label>
          <br />
          <textarea
            id="descr"
            type="text"
            placeholder="Short description"
            name="shortDescr"
            required
            className="formInput newArticeInput"
            ref={register}
            defaultValue={description}
          />
          {errors.shortDescr && <p>This is required</p>}
        </div>

        <div>
          <label className="formText" htmlFor="text">
            Text
          </label>
          <br />
          <textarea
            id="text"
            type="text"
            placeholder="Text"
            name="text"
            required
            className="formInput newArticeInput newArticleText"
            ref={register}
            defaultValue={body}
          />
          {errors.text && <p>This is required</p>}

          <div className="tagsBlock">
            <div>
              <p className="formText">Tags</p>
              {createTags(arrTags)}
            </div>
            <button
              type="button"
              className="serviceTagsBtn serviceTagsBtnAdd"
              style={addBtnStyle}
              onClick={(elem) => addTag(elem)}
              // defaultValue="Add tag"
            >
              Add tag
            </button>
          </div>

          <input className="newAccBtn" type="submit" value="Send" onClick={handleSubmit(onSubmit)} />
        </div>
      </form>
    );
  };

  if (articleData) return newArticle(articleData);

  return newArticle();
};

NewArticle.defaultProps = {
  onSubmit: () => {},
  articleData: {},
};

NewArticle.propTypes = {
  onSubmit: PropTypes.func,
  articleData: PropTypes.shape(PropTypes.string.isRequired),
};

export default NewArticle;
