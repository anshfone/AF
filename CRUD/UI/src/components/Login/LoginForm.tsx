import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm: React.FC<{}> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault()
    
  };

  return (
    <div id="login-form">
      <h1>Login</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="email" name="email" value={email} onChange={handleEmailChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" onChange={handlePasswordChange} />
        <input type="submit" value="Submit" onClick={handleLogin} />
      </form>
    </div>
  );
};

export default LoginForm;