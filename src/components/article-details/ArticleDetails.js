import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import ApiServices from '../../services';
// import { Typography } from 'antd';
import 'antd/dist/antd.css';
import * as actions from '../../actions/actions';
// import ArticleItem from '../article-item/ArticleItem';

import './ArticleDetails.scss';

const ArticleDetails = ({ getArticleAuthorData, authorData }) => {

    const [articleItem, setArticleItem] = useState([])
    const slugId = localStorage.getItem('slug')

    console.log(authorData)

    const extendedArticle = (data) => {
        if (data) {
            console.log(data)
            const { title, favoritesCount, body, slug, updatedAt} = data;
            // const date = format(new Date(authorData[2]), 'PP')

            // const { Text } = Typography;

            // function showTags(arr) {
            //     if (arr.length !== 0) arr.map((elem) => elem);
            //     return 'There are no tags'
            // }
            
            return (
                <div className='articleCard' key={`${slug}${title}`}>
                    <div className='basicInf'>
                        <div className='articleHeader'>
                            <span>{title}</span>
                            <input type='image' src='../../img/Likes.svg' alt='photo' />
                            <span className='like'>{favoritesCount}</span>
                        </div>
                        <div className='tagDiv'>
                            {/* <Text keyboard type="secondary" className='tag'>
                                {showTags(tagList)}
                            </Text> */}
                            tag
                        </div>
                        <div className='textDiv'>
                            <p className='articleText'>
                            <ReactMarkdown children={body} />
                            {/* {body} */}
                            </p>
                        </div>
                    </div>
                    <div className='author'>
                        <div className='authorInf'>
                            {/* <p className='authorName'>{author[0]}</p> */}
                            {/* <p className='articleDate'>{date}</p> */}
                        </div>
                        <div className='authorPhoto'>
                            {/* <img className='authorPhoto' src={author[1]} alt='author' /> */}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className='articleCard'>
                <span className='articleHeader'>Something went wrong</span>
            </div>
        )
    }

    useEffect(() => {
        ApiServices.getOneArticle(slugId)
        .then(data => {
            console.log(data)
            setArticleItem(data.article)
            getArticleAuthorData(data.article.author.username, data.article.author.image, data.article.updatedAt)
        })
    }, [])

    // return <div>{articleItem && <div>fvnkfjvnk</div>}</div>
    return <div>{articleItem && extendedArticle(articleItem)}</div>
    
}

const mapStateToProps = (state) => {
    return ({
        authorData: state.authorData
    })
  }

export default connect(mapStateToProps, actions)(ArticleDetails);