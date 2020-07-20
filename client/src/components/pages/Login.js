import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import Axios from 'axios';

//Ok if the login credentials is not valid, then we need to tell the user.
export const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const submit = e =>{
      e.preventDefault();
      if (email === "" || password === "" ){
        alert("Please type in valid login information.");
        return;
      }
      Axios({
          method: "POST",
          data: {
            "email": email,
            "password": password,
          },
          url: "/users/login",
        }).then(res=>{
              //Note that this webtoken needs to be set in the browser before going over to the profile page.
              if (res){
                  localStorage.setItem('usertoken', res.data);
                  history.push('./profile');
              }
        })
      .catch(err=>{
          console.log(err);
      })
  }

  return (
    <div>
      <div data-aos="fade-right" data-aos-duration="1000">
        <div className="login-container">
          <div className="columns is-centered">

          <div className="card">
            <header className="card-header">
              <p className="card-header-title">
              <h3><strong>Please Login</strong></h3>
              </p>
            </header>
              <div className="form-container">
                <div className='field'>
                  <p className='control has-icons-left has-icons-right'>
                    <input
                      className='input'
                      type='email'
                      placeholder='Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className='icon is-small is-left'>
                      <i className='fas fa-envelope' />
                    </span>
                    <span className='icon is-small is-right'>
                      <i className='fas fa-check' />
                    </span>
                  </p>
                </div>
                <div className='field'>
                  <p className='control has-icons-left'>
                    <input
                      className='input'
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className='icon is-small is-left'>
                      <i className='fas fa-lock' />
                    </span>
                  </p>
                </div>
                <div className='registerQuestion'>
                  <p>
                    Do not have an account? <Link to='/register'>Register</Link>
                  </p>
                </div>
                <div className='field'>
                  <p className='control'>
                    <button className='button is-primary' onClick={submit}>
                      Login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
