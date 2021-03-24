import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import ApiServices from '../../services';

import './CreateNewAcc.scss';

const CreateNewAcc = () => {
  const apiServices = new ApiServices();
  const [tokenFlag, setTokenFlag] = useState(false);
  const { register, handleSubmit, errors, watch } = useForm({});
  const pass = useRef({});
  pass.current = watch('password', '');
  const onSubmit = (data) => {
    apiServices.regRequets(data.Username, data.EmailAddress, data.password);
    setTokenFlag(true);
  };
  const style = {
    color: 'tomato',
  };

  if (tokenFlag) return <Redirect to="/sign-in" />;

  return (
    <div className="formBlock">
      <p className="formHeader">Create new account</p>

      <form className="accFormInputs" onSubmit={(event) => event.preventDefault()}>
        <label className="formText" htmlFor="usName">
          Username
        </label>
        <input
          id="usName"
          type="text"
          className="formInput"
          name="Username"
          placeholder="Username"
          ref={register({ required: true })}
          minLength="3"
          maxLength="20"
        />
        {errors.Username && <p>This is required</p>}

        <label className="formText" htmlFor="mail">
          Email address
        </label>
        <input
          id="mail"
          type="email "
          className="formInput"
          name="EmailAddress"
          placeholder="Email address"
          ref={register({ required: true })}
        />
        {errors.EmailAddress && <p>This is required</p>}

        <label className="formText" htmlFor="pass">
          Password
        </label>
        <input
          id="pass"
          type="password"
          className="formInput"
          name="password"
          placeholder="Password"
          ref={register({ required: true })}
          minLength="8"
          maxLength="40"
        />
        {errors.password && <p>This is required</p>}

        <label className="formText" htmlFor="repPass">
          Repeat Password
        </label>
        <input
          id="repPass"
          type="password"
          className="formInput"
          name="RepeatPassword"
          placeholder="Repeat Password"
          ref={register({
            // required: true,
            validate: (value) => value === pass.current || 'The passwords do not match',
          })}
          minLength="8"
          maxLength="40"
        />
        {errors.RepeatPassword && (
          <p style={style} className="formText">
            The passwords do not match
          </p>
        )}

        <div className="borderBottom" />
        <label className="checkBlock">
          <input type="checkbox" name="check" />
          {errors.check && <p>This is required</p>}
          <span className="checkboxText">I agree to the processing of my personal information</span>
        </label>
        <input className="newAccBtn" type="submit" required value="Create" onClick={handleSubmit(onSubmit)} />
      </form>

      <p className="accFooter">
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </p>
    </div>
  );
};

export default CreateNewAcc;
