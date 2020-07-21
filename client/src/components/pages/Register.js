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
    if (name === '' || email === '' || password === ''){
      alert('Please type in valid information');
      return;
    }
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
      <div data-aos="fade-right" data-aos-duration="1500">
        <div className="carding">
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
              <button className='button' onClick={submit}>Register</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
