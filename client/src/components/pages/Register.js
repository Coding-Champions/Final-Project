import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Axios from 'axios'

export const Register = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const submit = e => {
    e.preventDefault();
      Axios({
        method: 'POST',
        data: {
          "name": name,
          "password": password,
          "email": email
        },
        url: '/users/register'
      }).then(res => {
        console.log(res);
        history.push('./login');
      }).catch(err => {
        console.log(err)
      });
  }

  return (
    <div>
      <div data-aos="fade-left" data-aos-duration="1000">
        <div className="register-container">
          <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                <h3><strong>Please Sign Up</strong></h3>
                </p>
            </header>
            <div className='field'>
              <p className='control has-icons-left has-icons-right'>
                <input
                  className='input'
                  type='text'
                  placeholder='Name'
                  onChange={e=> setName(e.target.value)}
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
              <p className='control has-icons-left has-icons-right'>
                <input
                  className='input'
                  type='email'
                  placeholder='Email'
                
                  onChange={e=> setEmail(e.target.value)}
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
                
                  onChange={e=> setPassword( e.target.value)}
                />
                <span className='icon is-small is-left'>
                  <i className='fas fa-lock' />
                </span>
              </p>
            </div>
            <div className='loginQuestion'>
              <p>
                Already have an account? <Link to='/login'>Login</Link>
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <button className='button is-success'onClick={submit}>Register</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Register



/*
<div className='field'>
        <p className='control has-icons-left'>
          <input
            className='input'
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className='icon is-small is-left'>
            <i className='fas fa-lock' />
          </span>
        </p>
      </div>
*/

