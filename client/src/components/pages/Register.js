import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

export const Register = () => {
    const [user, setUser] = useState({name:'', email:'', password:'', password2:''});
    const {name, email, password, password2} = user;

    const handleChange = e =>{
        setUser({...user, [e.target.name]: e.target.value});  //set the value of the variable that user happens to change to be the value in the input field
    };

    const submit = e =>{
        e.preventDefault();
        if(password !== password2){
            console.log('passwords do not match');
        } else {
            Axios({
                method: "POST",
                data: {
                    "name": user.name,
                    "password": user.password,
                    "email": user.email,
                },
                withCredentials:true,
                url: "http://localhost:5000/register",
            }).then((res) => console.log(res));
        }
    }

    return (
        <div className="register">
        <h1>Sign Up</h1>
        <form onSubmit = {submit}>
            <input
            type="text" name="name" placeholder="name" value={name} onChange = {handleChange}
            />
            <input
            type="email" name="email" placeholder="email" value={email} onChange = {handleChange}
            />
            <input
            type="password" name="password" placeholder="Password" value={password} onChange = {handleChange}
            />
            <input
            type="password" name="password2" placeholder="Confirm Password" value={password2} onChange = {handleChange}
            />
            <input type = "submit" value = "Sign Up" className="btn" />
        </form>
        <div className = "question">
            <p>Already have an account? {" "} <Link to = "/login">Login</Link></p>
        </div>
      </div>
    )
}

export default Register;