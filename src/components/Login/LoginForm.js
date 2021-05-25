import React, { useState, useRef, useContext } from 'react';
import {useHistory} from 'react-router-dom'
import AuthContext from '../../store/auth-context';

import Card from '../UI/Card';
import './LoginForm.css';

const LoginForm = React.memo(props => {
  const history = useHistory()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };


  const submitHandler = event => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    setIsLoading(true)

    let url;
    if(isLogin){
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBse5yn6b6iSHVyfrOR7UYlwuxaYlNuJDQ"
    }else{
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBse5yn6b6iSHVyfrOR7UYlwuxaYlNuJDQ"
    }
      
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail, 
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      .then((res) => {
        setIsLoading(false)
        if (res.ok){

          return res.json()

        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authetication failed!'
            if(data && data.error && data.error.message){
              errorMessage = data.error.message;
            } 
            
            throw new Error(errorMessage)
          })
        }
      })
      .then(data => {
        authCtx.login(data.idToken)
        history.replace('/')
      })
      .catch(err => {
        alert(err.message)
      })

    }


  return (
    <section className="login-form">
      <h1 className="login-h1">{isLogin ? 'Log in' : 'Sign up'}</h1>
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">

            <label 
            htmlFor="email"
            >
              Username</label>
            <input
              type="email"
              id="email"
              required
              ref={emailInputRef}
            />

            <label 
            htmlFor="password"
            >
              Password
            </label>
            <input 
                type="password"
                required
                ref={passwordInputRef}
            />
          </div>
          

          <div className="login-form__actions">
          {!isLoading &&
            <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request...</p>}
          </div>

          <div className="login-form__actions" >
          <button
            className="create-new-account"
            type="button"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
        </form>
      </Card>
    </section>
  );
});

export default LoginForm;
