import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

export const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = user

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value }) //set the value of the variable that user happens to change to be the value in the input field
  }

  const submit = e => {
    e.preventDefault()
    if (password !== password2) {
      console.log('passwords do not match')
    } else {
      Axios({
        method: 'POST',
        data: {
          name: user.name,
          password: user.password,
          email: user.email
        },
        withCredentials: true,
        url: 'http://localhost:5000/register'
      }).then(res => console.log(res))
    }
  }

  return (
    <div>
      <div className='field'>
        <p className='control has-icons-left has-icons-right'>
          <input
            className='input'
            type='text'
            placeholder='Name'
            value={name}
            onChange={handleChange}
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
            value={email}
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <span className='icon is-small is-left'>
            <i className='fas fa-lock' />
          </span>
        </p>
      </div>
      <div className='field'>
        <p className='control has-icons-left'>
          <input
            className='input'
            type='password'
            placeholder='Confirm Password'
            value={password2}
            onChange={handleChange}
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
          <button className='button is-success'>Register</button>
        </p>
      </div>
    </div>
  )
}

export default Register
