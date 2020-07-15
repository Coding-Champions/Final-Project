import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export const Login = () => {
    const [user, setUser] = useState({email:'', password:''});
    const {email, password} = user;

    const handleChange = e =>{
        setUser({...user, [e.target.name]: e.target.value});  //set the value of the variable that user happens to change to be the value in the input field
    };

    const submit = e =>{
        e.preventDefault();
        Axios({
            method: "POST",
            data: {
              "email": user.email,
              "password": user.password,
            },
            withCredentials:true,
            url: "http://localhost:5000/auth",
          }).then((res) => console.log(res));
    }

    return (
        <div className="login">
        <h1>Login</h1>
        <form onSubmit = {submit}>
            <input
            type="email" name="email" placeholder="email" value={email} onChange = {handleChange}
            />
            <input
            type="password" name="password" placeholder="Password" value={password} onChange = {handleChange}
            />
            <input type = "submit" value = "Sign In" className="btn" />
        </form>
        <div className = "question">
            <p>Do not have an account? {" "} <Link to = "/register">Register</Link></p>
        </div>
      </div>
    )
}

export default Login;