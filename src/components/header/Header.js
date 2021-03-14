import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import ApiServices from '../../services';

import { Link, Redirect } from 'react-router-dom';

import './Header.scss';

const Header = ({ authFlag, auth, editProfileFlag, editProfile }) => {

    const userToken = localStorage.getItem('userToken')
    const userName = localStorage.getItem('userName')
    const userImage = localStorage.getItem('userImage')

    console.log(editProfileFlag)

    const onLogOut = () => {
        localStorage.removeItem('userToken')
        localStorage.removeItem('userName')
        localStorage.removeItem('userImage')
        auth(false)
        editProfile(false)
        return <Redirect to='sign-in' />
    }

    const showHeader = () => {
        if (userToken) {
    
            return (
                <div className='header'>
                    <Link to='/' style={{textDecoration: 'none'}} className='text'>Realworld Blog</Link>
                    <div className='loginBtns'>
                        <Link to='new-article' className='headerLink'><input type='submit' value='Create article' style={{fontSize: 16}} className='loginBtn' /></Link>
                        <Link to='profile' className='headerLink'><span className='authorName' style={{marginRight: 13}}>{userName}</span></Link>
                        <Link to='profile' className='headerLink'><img className='authorPhoto' src={`${userImage}`} alt='author' /></Link>
                        <Link to='sign-in' className='headerLink'><input type='submit' value='Log Out' className='loginBtn' onClick={onLogOut} /></Link>
                    </div>
                </div>
            )
        }
    
        return (
            <div className='header'>
                <Link to='/' style={{textDecoration: 'none'}} className='text'>Realworld Blog</Link>
                <div className='loginBtns'>
                    <Link to='sign-in' className='headerLink'><input type='submit' value='Sign In' className='loginBtn' /></Link>
                    <Link to='sign-up' className='headerLink'><input type='submit' value='Sign Up' className='loginBtn' /></Link>
                </div>
            </div>
        )
    }

    useEffect(() => {
        showHeader()
        authFlag && ApiServices.getUser(localStorage.getItem('userToken'))
                    .then(data => {
                        localStorage.setItem('userName', data.user.username)
                        localStorage.setItem('userImage', data.user.image)
                    })
    }, [authFlag, editProfileFlag])

    return showHeader()
    
}

const mapStateToProps = (state) => {
    return ({
        authFlag: state.form.authFlag,
        editProfileFlag: state.form.editProfileFlag
    })
  }

export default connect(mapStateToProps, actions)(Header);