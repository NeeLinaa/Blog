import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import * as actions from '../../actions/actions';
import ApiServices from '../../services';

import ArticleItem from '../article-item/ArticleItem';

import 'antd/dist/antd.css';
import './ArticleList.scss';

const ArticleList = ({ getAllArticles, loadingStor }) => {

    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(loadingStor)
    
  useEffect(() => {
    ApiServices.allArticlesRequest(page)
    .then((data) => getAllArticles(data.articles))

    setLoading(false)
  }, [page])

    return (
        <div>
            <ArticleItem loading={loading} />
            <div className="pagination">
                <Pagination 
                            defaultCurrent={1} 
                            total={50} 
                            onChange={(elem => setPage(elem * 10 - 10))} 
                    />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        loadingStor: state.articles[1]
    })
  }

export default connect(mapStateToProps, actions)(ArticleList);