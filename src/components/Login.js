import React from 'react';
import axios  from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email , setemail] = useState('');
  const [password , setpassword] = useState('');
  const [error , setError] = useState('');

  const navigate = useNavigate();

  const AddUser = async (event) => {
    event.preventDefault();
    try{
      const response =await axios.post("https://manage-courses-project-cs50.onrender.com/api/users/login", {email, password} );
      if(response.data.Login === "Login successed"){
        localStorage.setItem('token', response.data.data.token);
        navigate('/courses');
      }
      else {
      setError("Login failed. Please check your credentials.");
    }
    }
    catch(ERROR){
      setError(ERROR.response.data.ERROR || "An error occurred. Please try again.");
    }
  
   }

  return (
  <div>
    <form onSubmit={AddUser}>

    {error && <h2 style={{ color: 'red' }}>{error}</h2>}

    <br/><br/>
    
    <input type='email' placeholder='Set email' autoComplete='email' onChange={(event)=> {setemail(event.target.value)}}/>
    <br/><br/>
    <input type='password' placeholder='Set password' autoComplete='current-password' onChange={(event)=> {setpassword(event.target.value)}}/>
    
    <br/><br/><br/>
    <button type='Submit'> Submit </button>
    <br/>
    </form>
    <br/><br/>

    <p> If YOU ARE NOT REGISTER PLEASE <Link to="/">Register</Link> </p>
    
  </div>
);
}

export default Login;