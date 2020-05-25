import React, { useState } from 'react';
import axios from 'axios';
import AppNavbar from './AppNavbar';
import './style.css';
//import { setUserSession } from './Common';

function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  // handle button click of login form
  const handleLogin = () => {
   setError(null);
    setLoading(true);
    axios.post('/api/user/login', null ,{ params : {username: username.value, password: password.value} }).then(response => {
      setLoading(false);
      console.log(response);
      //setUserSession(response.data.token, response.data.user);
      if(response.data === 1) props.history.push('/users');
      else setError("Something went wrong. Please try again later.");
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
 } 
 
  return (
    <div>
      <AppNavbar/>
      <div class="login-form">
        <h2 class="text-center">Log in</h2>
        <div class="form-group">
              <input type="text" {...username} autoComplete="new-password" class="form-control" placeholder="Username" required="required" />
        </div>
        <div class="form-group">
              <input type="password" {...password} autoComplete="new-password" class="form-control" placeholder="Password" required="required" />
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}>Log in</button>
        </div>
        {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      </div>
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;