import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import { format } from 'date-fns';
import { Spin, Typography } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { Link } from 'react-router-dom';

import './ArticleItem.scss';

const ArticleItem = ({articles, loading}) => {

    const articleCard = (item) => {

        const { title, favoritesCount, body, author, updatedAt, slug, tagList} = item
        const date = format(new Date(updatedAt), 'PP')
        const itemSlug = `/articles/${slug}`

        const artileBody = `${body.split(' ').slice(0, 11).join(' ')}`;

        const { Text } = Typography;

        function showTags(arr) {
            if (arr.length !== 0) arr.map((elem) => elem);
            return 'There are no tags'
          }

        return (
            <div className='articleCard' key={slug}>
                <div className='basicInf'>
                    <div className='articleHeader'>
                        <Link to={itemSlug} id={slug} onClick={event => localStorage.setItem('slug', event.target.id)} className='title'>{title}</Link>
                        <HeartOutlined />
                        <span className='like'>{favoritesCount}</span>
                    </div>
                    <div className='tagDiv'>
                        <Text keyboard type="secondary" className='tag'>
                            {showTags(tagList)}
                        </Text>
                    </div>
                    <div className='textDiv'>
                        <p className='articleText'>
                            {artileBody}
                        </p>
                    </div>
                </div>
                <div className='author'>
                    <div className='authorInf'>
                        <p className='authorName'>{author.username}</p>
                        <p className='articleDate'>{date}</p>
                    </div>
                    <div className='authorPhoto'>
                        <img className='authorPhoto' src={author.image} alt='author' />
                    </div>
                </div>
            </div>
        )
    }

    if (!loading) {
        return (
            <div className="example">
              <Spin size="large" />
            </div>
          );
    }

    return <div>{articles && articles.map(article => articleCard(article))}</div>
}

const mapStateToProps = (state) => {
    return ({
      articles: state.articles[0],
      loading: state.articles[1]
    })
  }

export default connect(mapStateToProps, actions)(ArticleItem);