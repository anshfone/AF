import React, { useState } from "react";
import "./LoginForm.css";
import axios from 'axios';

const LoginForm: React.FC<{}> = ({}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login,setLogin] = useState<boolean>(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    const userData = {email: email, password: password}
    const responseData = await axios.post('http://localhost:3000/api/users/login',userData)
    if (responseData.data.status == 200) {
      const token: string = responseData.data.token
      document.cookie = `jwtToken=${token}; path=/`
    }
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