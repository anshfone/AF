import React, { useState } from "react";
import "./SignUpForm.css";
import axios from 'axios';

const SignUpForm: React.FC<{}> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    const userData = {email: email, password: password}
    const responseData = await axios.post('http://localhost:3000/api/users/signUp',userData)
    console.log(responseData)
  };

  return (
    <div id="login-form">
      <h1>SignUp</h1>
      <form>
        <label htmlFor="username">Email</label>
        <input type="text" id="email" name="email" value={email} onChange={handleEmailChange} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={handlePasswordChange} />
        <input type="submit" value="Submit" onClick={handleLogin} />
      </form>
    </div>
  );
};

export default SignUpForm;