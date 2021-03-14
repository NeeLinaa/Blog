import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
// import * as actions from '../../actions/actions';
import ApiServices from '../../services';

import './CreateNewAcc.scss'

const CreateNewAcc = () => {

    const { register, handleSubmit, errors, watch } = useForm({});
    const pass = useRef({});
    pass.current = watch('password', '');
    const onSubmit = (data) => {
        ApiServices.regRequets(data.Username, data.EmailAddress, data.password)
    }

    return (
        <div className='accForm'>
            <p className='accFormHeader'>Create new account</p>

            <form className='accFormInputs' onSubmit={event => event.preventDefault()}>
                <label className='formText'>Username</label>
                <input type='text' className='formInput' name='Username'
                       placeholder='Username' ref={register({ required: true })}
                       minLength='3' maxLength='20' />
                {errors.Username && <p>This is required</p>}

                <label className='formText'>Email address</label>
                <input type='email ' className='formInput'  name='EmailAddress'
                       placeholder='Email address' ref={register({ required: true })} />
                       {errors.EmailAddress && <p>This is required</p>}

                <label className='formText'>Password</label>
                <input type='password' className='formInput'  name='password'
                       placeholder='Password' ref={register({ required: true })}
                       minLength='8' maxLength='40' />
                       {errors.password && <p>This is required</p>}

                <label className='formText'>Repeat Password</label>
                <input type='password' className='formInput'  name='RepeatPassword'
                       placeholder='Repeat Password'
                       ref={register({
                        // required: true,
                        validate: value => (value === pass.current || 'The passwords do not match')
                       })}
                       minLength='8' maxLength='40' />
                       {errors.RepeatPassword && <p style={{color: 'tomato'}} className='formText'>The passwords do not match</p>}

                <div className='borderBottom'></div>
                <label className='checkBlock'>
                    <input type='checkbox' name='check' />
                    {errors.check && <p>This is required</p>}
                    <span className="checkboxText">
                        I agree to the processing of my personal information
                    </span>
                </label>
                <input 
                        className='newAccBtn' type='submit' required
                        value='Create' onClick={handleSubmit(onSubmit)} />
            </form>

            <p className='accFooter'>Already have an account? <Link to='/sign-in'>Sign In.</Link></p>
        </div>
    )
}

export default connect(null, null)(CreateNewAcc);