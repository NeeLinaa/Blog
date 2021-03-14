import React from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import ApiServices from '../../services'

import './EditProfile.scss';

const EditProfile = ({ editProfile }) => {

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        console.log(data)
        const { Username, Email, NewPassword, image } = data;
        if(localStorage.getItem('userToken')) {
            editProfile(true)
            ApiServices.updateUser(Username, Email, NewPassword, image)
        }
    }
    return (
        <div className='accForm' style={{height: 498}}>
            <p className='accFormHeader'>Edit Profile</p>
            <form className='accFormInputs'>

                <label className='formText'>Username</label>
                <input type='text' className='formInput' ref={register}
                       placeholder='Username' name='Username'
                       minLength='3' maxLength='20' />
                {errors.Username && <p>This is required</p>}

                <label className='formText'>Email address</label>
                <input type='email' className='formInput' ref={register} name='Email'
                       placeholder='Email address' /> 
                {errors.Email && <p>This is required</p>}

                <label className='formText'>New password</label>
                <input type='password' className='formInput'  ref={register}
                       placeholder='New password' name='NewPassword'
                       minLength='8' maxLength='40' />
                {errors.NewPassword && <p>This is required</p>}

                <label className='formText'>Avatar image (url)</label>
                <input type='text' className='formInput'  ref={register}
                       name='image' placeholder='Avatar image' />

                <input 
                        className='newAccBtn' type='submit' 
                        value='Save' onClick={handleSubmit(onSubmit)} />
            </form>
        </div>
    )
}

export default connect(null, actions)(EditProfile);