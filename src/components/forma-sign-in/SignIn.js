import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../../actions/actions';
import ApiServices from '../../services';

import './SignIn.scss';

const SignIn = ({getUserData, auth}) => {
    const [tokenFlag, setTokenFlag] = useState(false)
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        console.log(data)
        ApiServices.authentication(data.email, data.password)
        .then(data => {
          getUserData(data.user.username, data.user.image)
          auth(true)
          localStorage.setItem('userToken', data.user.token)
          setTokenFlag(true)
        })
    }

    if (tokenFlag) {
        return <Redirect to='/' />
    }

    return (
        <div className='accForm' style={{height: 384}}>
            <p className='accFormHeader'>Sign in</p>
            <form className='accFormInputs'>
                <label className='formText'>Email address</label>
                <input type='email' className='formInput' name='email'
                       placeholder='Email address' ref={register} />
                {errors.email && <p>This is required</p>}

                <label className='formText'>Password</label>
                <input type='password' className='formInput' name='password'
                       placeholder='Password' ref={register}
                       minLength='8' maxLength='40' />
                {errors.password && <p>This is required</p>}

                <input 
                    className='newAccBtn' type='submit' 
                    value='Log In' onClick={handleSubmit(onSubmit)} />

            </form>
            <p className='accFooter'>Don’t have an account? <Link to='/sign-up'>Sign Up.</Link></p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.form.data,
        pass: state.form.pass
    }
}

export default connect(mapStateToProps, actions)(SignIn);