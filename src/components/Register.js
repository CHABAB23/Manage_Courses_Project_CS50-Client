import React from 'react';
import axios  from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [FirstName , setFirstName] = useState('');
  const [LastName , setLastName] = useState('');
  const [email , setemail] = useState('');
  const [password , setpassword] = useState('');
  const [role , setrole] = useState('');

  const navigate = useNavigate();

  const AddUser = async (event) => {
    event.preventDefault();
    await axios.post("https://manage-courses-project-cs50.onrender.com/api/users/register", {FirstName, LastName, email, password ,role} );
    navigate('/login');
   }

  return (
  <div>
    <form onSubmit={AddUser}>
    <br/><br/>
    <input type='text' placeholder='Set FirstName' onChange={(event)=> {setFirstName(event.target.value)}}/>
    <br/><br/>
    <input type='text' placeholder='Set LastName' onChange={(event)=> {setLastName(event.target.value)}}/>
    <br/><br/>
    <input type='email' placeholder='Set email' onChange={(event)=> {setemail(event.target.value)}}/>
    <br/><br/>
    <input type='password' placeholder='Set password' onChange={(event)=> {setpassword(event.target.value)}}/>
    <br/><br/>
    <input type='text' placeholder='Set role' onChange={(event)=> {setrole(event.target.value)}}/>
    <br/><br/><br/>
    <button type='Submit'> Submit </button>
    <br/>
    </form>
    <br/><br/>
    <p> If YOU ARE ALREADY REGISTER PLEASE <Link to="/login">LOGIN</Link> </p>
    
  </div>
);
}

export default Register;
