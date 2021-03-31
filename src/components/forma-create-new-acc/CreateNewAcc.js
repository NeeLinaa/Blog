import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
// import { message } from 'antd';
import ApiServices from '../../services';
import { signInPath } from '../../routeService';

import './CreateNewAcc.scss';

const CreateNewAcc = () => {
  const [tokenFlag, setTokenFlag] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { register, handleSubmit, errors, watch } = useForm({});
  const pass = useRef({});
  pass.current = watch('password', '');
  const onSubmit = (data) => {
    ApiServices.regRequets(data.Username, data.EmailAddress, data.password);
    setTokenFlag(true);
    setIsDisabled(true);
    // if (!tokenFlag) message.error('Failed to register');
  };
  console.log(tokenFlag);
  const styleErr = {
    color: 'tomato',
    fontSize: '12px',
    margin: 0,
    position: 'relative',
    top: -5,
  };

  if (tokenFlag) return <Redirect to="/sign-in" />;

  return (
    <div className="formBlock">
      <p className="formHeader">Create new account</p>

      <form className="accFormInputs" onSubmit={(event) => event.preventDefault()}>
        <fieldset disabled={isDisabled}>
          <label className="formText" htmlFor="usName">
            Username
          </label>
          <input
            id="usName"
            type="text"
            className="formInput"
            name="Username"
            placeholder="Username"
            required
            ref={register({ required: true })}
            pattern="[A-Za-z]{3,20}"
          />
          {errors.Username && (
            <p style={styleErr} className="formText">
              Username must be from 3 to 20 characters
            </p>
          )}

          <label className="formText" htmlFor="mail">
            Email address
          </label>
          <input
            id="mail"
            type="email "
            className="formInput"
            name="EmailAddress"
            placeholder="Email address"
            required
            ref={register({ required: true })}
          />
          {errors.EmailAddress && (
            <p style={styleErr} className="formText">
              This is required
            </p>
          )}

          <label className="formText" htmlFor="pass">
            Password
          </label>
          <input
            id="pass"
            type="password"
            className="formInput"
            name="password"
            placeholder="Password"
            required
            ref={register({ required: true })}
            pattern="[A-Za-z0-9]{8,40}"
          />
          {errors.password && (
            <p style={styleErr} className="formText">
              Password must be from 8 to 40 characters, can consist of uppercase and uppercase letters
            </p>
          )}

          <label className="formText" htmlFor="repPass">
            Repeat Password
          </label>
          <input
            id="repPass"
            type="password"
            className="formInput"
            name="RepeatPassword"
            placeholder="Repeat Password"
            required
            ref={register({
              validate: (value) => value === pass.current || 'The passwords do not match',
            })}
            pattern="{8,40}"
          />
          {errors.RepeatPassword && (
            <p style={styleErr} className="formText">
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
        </fieldset>
      </form>

      <p className="accFooter">
        Already have an account? <Link to={signInPath}>Sign In.</Link>
      </p>
    </div>
  );
};

export default CreateNewAcc;
